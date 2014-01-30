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
        // Get the container div from the element passed from the host
        this.containerDiv = this.domEl.querySelector(".container");

        this.onMIDIMessage = function (message, when) {
            var key, msgString = '', value = message[key];
            // If key is number
            if (! isNaN (value - 0) && value !== null) {
                // Round it to three decimals
                value = Math.round(value * 1000) / 1000;
            }
            // Build the html
            for (key in message) {
                msgString += '<div class="midi-block"> <span class="key">' + key + ":" + '</span><span class="message">' + value + "</span></div>";
            }
            // Add when
            msgString += '<div class="midi-block"> <span class="key">when:</span><span class="message">' + when + "</span></div>";
            // Overwrite the content of the container div
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
