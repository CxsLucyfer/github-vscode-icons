import { getIconForPBSyntax, getIconUrl, DEFAULT_FILE } from '../utils/Icons';
import { isPastebinUserList, isPasteOpen } from '../utils/PageDetect';

const QUERY_PASTEBIN_ITEMS = '.maintable>tbody>tr';
const QUERY_PASTEBIN_PASTE = '#code_buttons>span:last-child';

function showIconsForFiles() {
    const pastes = document.querySelectorAll(QUERY_PASTEBIN_ITEMS);
    // skip first tr, which is header
    for (let i = 1; i < pastes.length; i++) {
        // [TD: [IMG: ICON, A: NAME]] [TD: AGE] [TD: HITS] [TD: [A: SYNTAX]]
        const item = pastes[i];
        const newIconEl = document.createElement('img');

        const iconAndNameEl = item.firstElementChild as HTMLTableDataCellElement;
        const iconEl = iconAndNameEl.firstElementChild as HTMLImageElement;

        const syntaxEl = item.childNodes[9] as HTMLAnchorElement;
        const syntaxName = syntaxEl.innerText;

        console.log(syntaxName);

        const iconPath = getIconForPBSyntax(syntaxName);

        newIconEl.setAttribute('src', getIconUrl(iconPath));
        newIconEl.setAttribute('class', 'vscode-icon vsi-pb');

        iconAndNameEl.replaceChild(newIconEl, iconEl);
    }
}

function showIconForPaste() {
    // TODO:
}

const domLoaded = new Promise(resolve => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
    } else {
        resolve();
    }
});

function update(e?: any) {
    if (isPastebinUserList) {
        showIconsForFiles();
    } else if (isPasteOpen) {
        showIconForPaste();
    }
}

export function initPasteBin() {
    update();
}