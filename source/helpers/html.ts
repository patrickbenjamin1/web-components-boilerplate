export namespace HTMLHelpers {
    export const replaceVariable = (html: string, variable: string, value: string) => {
        const regex = new RegExp('{{' + variable + '}}', 'g');
        return html.replace(regex, value || '');
    };

    export const replaceVariables = (html: string, variables: { variable: string; value: string }[]) => {
        let newHtml = html;
        variables.forEach(variable => (newHtml = replaceVariable(newHtml, variable.variable, variable.value)));
        return newHtml;
    };
}
