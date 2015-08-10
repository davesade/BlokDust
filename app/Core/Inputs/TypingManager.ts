/**
 * Created by luketwyman on 02/08/2015.
 */
import InputManager = require("./InputManager");

class TypingManager extends InputManager {

    private _String: string;
    private _Panel: any;
    private _CharLimit: number;

    constructor() {
        super();

        this.IsEnabled = false;
        this._String = "";
        this._CharLimit = 20;
    }

    KeyboardDown(e) {
        super.KeyboardDown(e);
        if (!this.IsEnabled) return;

        var code = e.keyCode;
        this.AddToString(code);
        this.RemoveFromString();
        this.StringReturn();
    }

    KeyboardUp(e) {
        super.KeyboardUp(e);
        if (!this.IsEnabled) return;
    }

    AddToString(code) {
        //TODO special / secondary characters
        if (!this.IsModifierDown()) {
            if (this._String.length<this._CharLimit) {
                if ((code > 47 && code < 91) || (code > 105 && code < 112) || (code > 185 && code < 193) || (code > 218 && code < 223) || code == 32) {
                    var key = ""+String.fromCharCode(code);
                    this._String = "" + this._String + key;
                    this._Panel.UpdateString(this._String);
                }
            }
        }
    }

    RemoveFromString() {
        if (this.IsKeyNameDown(this.KeyMap.Backspace)) {
            this._String = this._String.substring(0, this._String.length-1);
            this._Panel.UpdateString(this._String);
        }
    }

    StringReturn() {
        if (this.IsKeyNameDown(this.KeyMap.Enter)) {
            this._Panel.StringReturn();
        }
    }

    Enable(panel) {
        this.IsEnabled = true;
        this._Panel = panel;
        this._String = panel.GetString();
    }

    Disable() {
        this.IsEnabled = false;
    }
}

export = TypingManager;