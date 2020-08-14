function createTerminal(element) {

    element.innerHTML = `
    <div class="terminal-container">
        <div class="output">
        </div>
        <input class="terminal-input" type="text" spellcheck="false" name="in" onkeypress="Terminal.data('${this._id}', event)"/>
    </div>
    `;

    return {
        
    };
}