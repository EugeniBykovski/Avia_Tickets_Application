import {format} from 'date-fns';

// за счет таких комментарие нам vscode будет в дальнейшем подсказывать что и где
/**
 * 
 * @param {String} str 
 * @param {String} type - 'yyyy.mm.dd'
 */

export function formatDate(str, type) {
    const date = new Date(str);
    return format(date, type);
}