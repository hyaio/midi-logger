define(['require', './assets/templates/htmltemplate.html!text', './assets/templates/styletemplate.css!text'], function(require, htmlTemp, cssTemp) {

    var pluginConf = {
        name: "MIDI Logger",
        osc: false,
        version: '0.0.1',
        hyaId: 'EXMIDILOG',
        ui: {
            type: 'div',
            width: 320,
            height: 150,
            html: htmlTemp,
            css: cssTemp
        }
    };

    var pluginFunction = function(args) {

        this.domEl = args.div;
        this.containerDiv = this.domEl.querySelector(".container");

        this.onMIDIMessage = function (message, when) {
            var key, msgString = '';
            for (key in message) {
                msgString += '<div> <span class="key">' + key + ":" + '</span><span class="message">' + message[key] + "</span></div>";
            }
            this.containerDiv.innerHTML = msgString;
        }.bind(this);

        args.MIDIHandler.setMIDICallback (this.onMIDIMessage);
        
        // Initialization made it so far: plugin is ready.
        args.hostInterface.setInstanceStatus ('ready');
    };


    var initPlugin = function(initArgs) {
        pluginFunction.call (this, initArgs);
    };

    return {
        initPlugin: initPlugin,
        pluginConf: pluginConf
    };
});
