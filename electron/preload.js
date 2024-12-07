const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    fetchData: () => ipcRenderer.invoke('fetch-data'),
});
