export namespace TextHelpers {
    export const kebabToCamel = (text: string) => text.replace(/-\w/g, str => str?.[1]?.toUpperCase());
    export const camelToKebab = (text: string) => text.replace(/[A-Z]/g, str => `-${str.toLowerCase()}`);
}
