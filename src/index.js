import { Dropbox } from "dropbox";
import "./style.css";

const dbx = new Dropbox({
  accessToken: "JZSV7gbrEoAAAAAAAAAAHB8MVTB5OVb-VC8u41bqbgmpBgkaY-j_CIDEiEcTUKX5",
  fetch // fetch: fetch --> we will use native fetch library for making requests
});

const fileListElem = document.querySelector(".js-file-list");
const loadingElem = document.querySelector(".js-loading");
const rootPathForm = document.querySelector(".js-root-path__form");
const rootPathInput = document.querySelector(".js-root-path__input");
const organizeBtn = document.querySelector(".js-organize-btn");

rootPathForm.addEventListener("submit", (e) => {
  e.preventDefault();
  state.rootPath = rootPathInput.value === "/" ? "" : rootPathInput.value.toLowerCase();
  reset();
});

organizeBtn.addEventListener("click", async (e) => {
  const originalMsg = e.target.innerHTML; // get button text -> "Organize"
  e.target.disabled = true;
  e.target.innerHTML = "Working..."; // change button text -> "Working..."
  await moveFilesToDatedFolders();
  e.target.disabled = false;
  e.target.innerHTML = originalMsg; // return back button text -> "Organize"
  reset();
});

const state = {
  files: [],
  rootPath: ""
};

const init = async () => {
  try {
    const res = await dbx.filesListFolder({
      path: state.rootPath,
      limit: 20 // limit: 5
    });
    console.log(res);

    // if result isn't empty
    if (res.entries.length) {
      updateFiles(res.entries);

      // load more
      if (res.has_more) {
        loadingElem.classList.remove("hidden");
        await getMoreFiles(res.cursor, (more) => updateFiles(more.entries));
        loadingElem.classList.add("hidden");
      } else {
        loadingElem.classList.add("hidden");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const updateFiles = (files) => {
  state.files = [...state.files, ...files];

  renderFiles();
  getThumbnails(files);
};

const getMoreFiles = async (cursor, cb) => {
  try {
    const res = await dbx.filesListFolderContinue({ cursor });
    console.log(res);

    if (cb) cb(res);
    if (res.has_more) {
      await getMoreFiles(res.cursor, cb);
    }
  } catch (error) {
    console.error(error);
  }
};

const renderFiles = () => {
  fileListElem.innerHTML = state.files
    .sort((a, b) => {
      // sort alphabetically, folders first
      if ((a[".tag"] === "folder" || b[".tag"] === "folder") && !(a[".tag"] === b[".tag"])) {
        return a[".tag"] === "folder" ? -1 : 1;
      } else {
        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
      }
    })
    .map((file) => {
      const type = file[".tag"];

      let thumbnail; // base placeholder picture, later we get the real thumbnail

      // file or folder
      if (type === "file") {
        thumbnail = file.thumbnail
          ? `data:image/jpeg;base64, ${file.thumbnail}`
          : `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWZpbGUiPjxwYXRoIGQ9Ik0xMyAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOXoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIxMyAyIDEzIDkgMjAgOSI+PC9wb2x5bGluZT48L3N2Zz4=`;
      } else {
        thumbnail = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWZvbGRlciI+PHBhdGggZD0iTTIyIDE5YTIgMiAwIDAgMS0yIDJINGEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmg1bDIgM2g5YTIgMiAwIDAgMSAyIDJ6Ij48L3BhdGg+PC9zdmc+`;
      }

      return `
        <li class="dbx-list-item ${type}">
          <img class="dbx-thumb" src="${thumbnail}">
          ${file.name}
        </li>
      `;
    })
    .join(""); // because we recieved array of strings after mapping
};

const getThumbnails = async (files) => {
  const paths = files
    .filter((file) => file[".tag"] === "file") // only for files, not folders
    .map((file) => ({
      path: file.path_lower,
      size: "w32h32"
    }));

  try {
    const res = await dbx.filesGetThumbnailBatch({
      entries: paths
    });
    console.log(res);

    // make a copy of state.files
    const newStateFiles = [...state.files];
    // loop through the file objects returned from dbx
    res.entries.forEach((file) => {
      // figure out the index of the file we need to update
      let indexToUpdate = state.files.findIndex(
        (stateFile) => file.metadata.path_lower === stateFile.path_lower
      );
      // put a .thumbnail property on the corresponding file
      newStateFiles[indexToUpdate].thumbnail = file.thumbnail;
    });

    state.files = newStateFiles;

    renderFiles();
  } catch (error) {
    console.error(error);
  }
};

// all files will be organized in folders with names by years and months of their creation
const moveFilesToDatedFolders = async () => {
  const entries = state.files
    .filter((file) => file[".tag"] === "file")
    .map((file) => {
      const date = new Date(file.client_modified);
      return {
        from_path: file.path_lower,
        to_path: `${state.rootPath}/${date.getFullYear()}/${date.getUTCMonth() + 1}/${file.name}` // "root/year/month/file"
      };
    });

  try {
    let res = await dbx.filesMoveBatchV2({ entries });
    console.log(res);

    const { async_job_id } = res;
    if (async_job_id) {
      do {
        res = await dbx.filesMoveBatchCheckV2({ async_job_id });
        console.log(res);
      } while (res[".tag"] === "in_progress");
    }
  } catch (error) {
    console.error(error);
  }
};

const reset = () => {
  state.files = [];
  loadingElem.classList.remove("hidden");
  init();
};

init();
