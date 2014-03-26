// Older browser work around for Array.indexOf()
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement /*, fromIndex */) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}
// Older browser workaround for String.trim()
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

/**
 * This code will find textarea elements in table elements and manage the saving of their content
 * and printing
 */
(function() {
// IDs of all the textareas that are saving data
    var textareasids = [],
            vle_saving_message_flag = false, // Just a flag to decide whether to show a message about not saving to VLE
            intervalid = null, // The ID of the currently running interval function... so it can be removed
            savebuttoncount = 0, // Need to keep track of how many save buttons are open so the save all buttons can be toggled
            course_id = VLE.get_param('course_id') || VLE.get_param('_c'),
            document_id = VLE.get_param('document_id') || VLE.get_param('_i'),
            activity_id = VLE.get_param('activity_id') || VLE.get_param('_a'),
            previous_values; // Leave undefined to pass as a default param to the VLE functions

// Get all the text areas on the page and manage their saving
    var setstuffup = function() {
        // Set a default version here that will hopefully be overwritten by the passed in ID from the wrapper div
        doMath();
        var uniqueidstring = "x-x-x-x-ou-u",
                clear_text = 'Clear',
                save_text = 'Save';
        // Put a print button at the top of the page
        var printicon = document.createElement("img");
        printicon.src = "./printable_version-1.0.png";
        printicon.alt = "Print view";
        var printbutton = document.createElement("button");
        printbutton.onclick = printtables;
        var printdiv = document.createElement("div");
        $(printdiv).attr("class", "printContainer");
        // Make the whole thing
        printbutton.appendChild(printicon);
        printdiv.appendChild(printbutton);
        // Find the wrapper div in the html
        var classname = "tablesContainer";
        var arrobjs = $("." + classname);
        // Overwrite with the ID from the html's wrapper div
        if (arrobjs.length === 1) {
            // Add the print icon above the 'tablesContainer' div that has the text in tables
            printdiv = arrobjs[0].parentNode.insertBefore(printdiv, arrobjs[0]);
            var wrapperdivid = arrobjs[0].getAttribute("id");
            // Check its there
            if (wrapperdivid !== null) {
                /* Need to make a function that parses the ID
                 * and throws an error if not valid
                 */
                if (wrapperdivid.trim() !== "") {
                    uniqueidstring = wrapperdivid;
                }
            }
        }
        // Get all the tables on the page
        var texttables = document.getElementsByTagName('table');
        // Do stuff to the text-in-tables tables on this page
        for (t = 0; t < texttables.length; t++) {
            var addsavebuttons = true;
            var addnewrowbutton = false;
            var changeLabel = false;
            var addsaveallbuttons = true;
            // Give each one a unique ID for this activity
            var tableid = 't' + t + '-' + uniqueidstring;

            // Get all the table's textareas
            var textareas = texttables[t].getElementsByTagName('textarea');
            if (textareas.length > 1) {
                clear_text = 'Clear all';
                save_text = 'Save all';
            } else {
                clear_text = 'Clear';
                save_text = 'Save';
            }
            $(texttables[t]).attr('id', tableid);
            // Decide whether to add the buttons from the table's class name(s)
            if (texttables[t].className.match(/(?:^|\s)nosavebuttons(?!\S)/)) {
                addsavebuttons = false;
                // Remove this flag classname
                texttables[t].className = texttables[t].className.replace(/(?:^|\s)nosavebuttons(?!\S)/g, '');
            }
            if (texttables[t].className.match(/(?:^|\s)addnewrowbutton(?!\S)/)) {
                addnewrowbutton = true;
                // Remove this flag classname
                texttables[t].className = texttables[t].className.replace(/(?:^|\s)addnewrowbutton(?!\S)/g, '');
            }
            if (texttables[t].className.match(/(?:^|\s)changelabel(?!\S)/)) {
                changeLabel = true;
                // Remove this flag classname
                texttables[t].className = texttables[t].className.replace(/(?:^|\s)changelabel(?!\S)/g, '');
            }
            if (texttables[t].className.match(/(?:^|\s)nosaveallbuttons(?!\S)/)) {
                addsaveallbuttons = false;
                // Add some padding to bottom of table
                texttables[t].style.marginBottom = "10px";
                texttables[t].className = texttables[t].className.replace(/(?:^|\s)nosaveallbuttons(?!\S)/g, '');
            }
            // If no custom style is set add the default one
            if (texttables[t].className.trim() === "") {
                $(texttables[t]).attr('class', 'defaulttexttable');
            }

            (function(tableid, changeLabel) {
                var ta = tableid,
                        chl = changeLabel;
                VLE.get_server_data(true, [ta], function(values) {
                    var i;
                    for (i in values) {
                        if (values.hasOwnProperty(i)) {
                            generateTableFromMap(values[i], chl);
                        }
                    }
                }, function(message) {
                    if (message === null) {
                        if (window.sessionStorage && window.sessionStorage.length > 0) {
                            if (window.sessionStorage.getItem(ta) !== null) {
                                $('#sb_' + ta).removeAttr("disabled");
                                $('#cb_' + ta).removeAttr("disabled");
                                generateTableFromMap(window.sessionStorage.getItem(ta), chl);
                            } else if (window.localStorage) {
                                if (window.localStorage.getItem(ta) !== null) {
                                    generateTableFromMap(window.localStorage.getItem(ta), chl);
                                }
                            }
                        } else {
                            if (window.localStorage) {
                                if (window.localStorage.getItem(ta) !== null) {
                                    generateTableFromMap(window.localStorage.getItem(ta), chl);
                                }
                            }
                        }
                    }
                });
            }(tableid, changeLabel));

            (function(tableid) {
                var ta = tableid;
                VLE.get_server_data(true, 'selectors', function(values) {
                    var i;
                    for (i in values) {
                        if (values.hasOwnProperty(i)) {
                            loadSelectors(values[i]);
                        }
                    }
                }, function(message) {
                    if (message === null) {
                        if (window.sessionStorage && window.sessionStorage.length > 0) {
                            if (window.sessionStorage.getItem('selectors') !== null) {
                                $('#sb_' + ta).removeAttr("disabled");
                                $('#cb_' + ta).removeAttr("disabled");
                                loadSelectors(window.sessionStorage.getItem('selectors'));
                            } else if (window.localStorage) {
                                if (window.localStorage.getItem('selectors') !== null) {
                                    loadSelectors(window.localStorage.getItem('selectors'));
                                }
                            }
                        } else {
                            if (window.localStorage) {
                                if (window.localStorage.getItem('selectors') !== null) {
                                    loadSelectors(window.localStorage.getItem('selectors'));
                                }
                            }
                        }
                    }
                });
            }(tableid));

            // Add a save all button after the table
            if (addsaveallbuttons) {
                var saveallbuttonholder = document.createElement("div"),
                        saveallbutton = document.createElement("button"),
                        clearallbutton = document.createElement("button"),
                        savealltxt = document.createTextNode(save_text),
                        clearalltxt = document.createTextNode(clear_text);

                $(saveallbuttonholder).attr("class", "buttonContainer");
                $(saveallbutton).attr('id', 'sb_' + tableid);
                $(clearallbutton).attr('id', 'cb_' + tableid);
                $(saveallbutton).attr("disabled", "disabled");
                $(clearallbutton).attr("disabled", "disabled");
                saveallbutton.appendChild(savealltxt);
                clearallbutton.appendChild(clearalltxt);
                saveallbuttonholder.appendChild(clearallbutton);
                saveallbuttonholder.appendChild(saveallbutton);
                texttables[t].parentNode.insertBefore(saveallbuttonholder, texttables[t].nextSibling);
                if (textareas.length > 0) {
                    (function(ctableid) {
                        var lctableid = ctableid;
                        if (saveallbutton.addEventListener) {
                            saveallbutton.addEventListener('click', function() {
                                return saveserverdata(lctableid);
                            }, false);
                            clearallbutton.addEventListener('click', function(e) {
                                return clearAllTextInTable(e, lctableid);
                            }, false);
                        } else if (saveallbutton.attachEvent) {
                            saveallbutton.attachEvent('onclick', function() {
                                return saveserverdata(lctableid);
                            });
                            clearallbutton.attachEvent('onclick', function(e) {
                                return clearAllTextInTable(e, lctableid);
                            });
                        }
                    }(tableid));
                }
            }

            // Add a add new row button after the table
            if (addnewrowbutton) {
                var saveallbuttonholder = document.createElement("div"),
                        addrowbutton = document.createElement("button");
                $(addrowbutton).attr('id', 'addRow' + tableid);
                addrowbutton.innerHTML = "Add new row";
                $(saveallbuttonholder).attr("class", "buttonContainer");

                saveallbuttonholder.appendChild(addrowbutton);

                texttables[t].parentNode.insertBefore(saveallbuttonholder, texttables[t].nextSibling);
                (function(ctableid, changeLabel) {
                    var ta = ctableid,
                            chl = changeLabel;
                    $(addrowbutton).on("click", function() {
                        addRowToTable(ta, chl);
                    });
                }(tableid, changeLabel));
            }

            // Do stuff to all of its textareas
            for (i = 0; i < textareas.length; i++) {
                // Give each one a unique ID in this activity
                var textareaid = 'ta' + i + '_' + tableid;
                $(textareas[i]).attr('id', textareaid);
                // Add ID to global array for other functions to access
                textareasids.push(textareaid);
                // Add Element to global object for other functions to access
                // Set a focus listener on the textarea, on activate it starts saving to session storage
                (function(taid) {
                    var ctextareaid = taid;
                    if (textareas[i].addEventListener) {
                        textareas[i].addEventListener('focus', function() {
                            startpolling(ctextareaid);
                        }, false);
                    } else if (textareas[i].attachEvent) {
                        textareas[i].attachEvent('onfocus', function() {
                            startpolling(ctextareaid);
                        });
                    }
                }(textareaid));
                // Add a save button for this textarea
                if (addsavebuttons) {
                    var savebuttonholder = document.createElement("div");
                    $(savebuttonholder).attr("class", "buttonContainer");
                    var txtareasavebutton = document.createElement("button");
                    var savetxt = document.createTextNode("Save");
                    $(txtareasavebutton).attr("disabled", "disabled");
                    savebuttonholder.appendChild(txtareasavebutton);
                    txtareasavebutton.appendChild(savetxt);
                    var parentcell = textareas[i].parentNode;
                    parentcell.insertBefore(savebuttonholder, textareas[i].nextSibling);
                    // Give the save button an ID based on the textarea it controls				
                    $(txtareasavebutton).attr("id", "sb_" + textareaid);
                    (function(taid) {
                        var ctextareaid = taid;
                        if (txtareasavebutton.addEventListener) {
                            txtareasavebutton.addEventListener('click', function() {
                                return saveserverdata(ctextareaid);
                            }, false);
                        } else if (txtareasavebutton.attachEvent) {
                            txtareasavebutton.attachEvent('onclick', function() {
                                return saveserverdata(ctextareaid);
                            });
                        }
                    }(textareaid));
                }
            }
        }

        if (textareasids.length > 0) {
            // Get all the data for storage
            VLE.get_server_data(true, textareasids,
                    function(values) {
                        var i;
                        for (i in values) {
                            if (values.hasOwnProperty(i)) {
                                var textarea = document.getElementById(i);
                                textarea.value = values[i];
                            }
                        }
                        // Put any session data over the top as it must have been reload and don't want to lose it
                        getandsetsessiondata();
                    },
                    function getdataerror(message) {
                        var i = 0;
                        if (message === null) {
                            for (i = 0; i < textareasids.length; i++) {
                                if (window.localStorage) {
                                    if (window.localStorage.getItem(textareasids[i]) !== null) {
                                        var textarea = document.getElementById(textareasids[i]);
                                        textarea.value = window.localStorage.getItem(textareasids[i]);
                                    }
                                }
                            }
                            // Put any session data over the top as it must have been reload and don't want to lose it
                            getandsetsessiondata();
                        } else {
                            // Decide what to do if something does go wrong
                            alert("Error. Unable to get VLE or Local storage data.");
                        }
                    }, activity_id, document_id, course_id
                    );
        }
        (function(tableid) {
            var ta = tableid;
            $('select').on("change", function(e) {
                doMath(e);
                $('#sb_' + ta).removeAttr("disabled");
                $('#cb_' + ta).removeAttr("disabled");
                if (window.sessionStorage) {
                    if (!is_ie8) {
                        var selectors = getSelectors();
                        window.sessionStorage.setItem('selectors', JSON.stringify(selectors, null, 2));
                    }
                }
            });
        }(tableid));
    };

    setstuffup();

    function doMath(e) {

        var ob = $('select'),
                a = 0,
                b = 0,
                c = 0,
                d = 0,
                e = 0;
        var leng = ob.length;
        while (leng--) {
            var tmpOb = $(ob[leng]);
            if (tmpOb.attr('id') === 'sel1' || tmpOb.attr('id') === 'sel2' || tmpOb.attr('id') === 'sel3' || tmpOb.attr('id') === 'sel4' || tmpOb.attr('id') === 'sel5')
                a = a + (tmpOb.val() * 1);
            if (tmpOb.attr('id') === 'sel6' || tmpOb.attr('id') === 'sel7' || tmpOb.attr('id') === 'sel8' || tmpOb.attr('id') === 'sel9')
                b = b + (tmpOb.val() * 1);
            if (tmpOb.attr('id') === 'sel10' || tmpOb.attr('id') === 'sel11' || tmpOb.attr('id') === 'sel12')
                c = c + (tmpOb.val() * 1);
            if (tmpOb.attr('id') === 'sel13' || tmpOb.attr('id') === 'sel14' || tmpOb.attr('id') === 'sel15' || tmpOb.attr('id') === 'sel16')
                d = d + (tmpOb.val() * 1);
            if (tmpOb.attr('id') === 'sel17' || tmpOb.attr('id') === 'sel18' || tmpOb.attr('id') === 'sel19')
                e = e + (tmpOb.val() * 1);
        }
        document.getElementById('val1').innerHTML = a;
        document.getElementById('val2').innerHTML = b;
        document.getElementById('val3').innerHTML = c;
        document.getElementById('val4').innerHTML = d;
        document.getElementById('val5').innerHTML = e;

    }
    ;


    function addRowToTable(tableId, chl) {
        var tr = $("#" + tableId + " tr").last(),
                clone = tr.clone();

        clone.removeClass('nochange');

        var textarea = clone.find('textarea');
        var nextI = textareasids.length;
        for (var i = 0, j = textarea.length; i < j; i++) {
            var textareaid = 'ta' + nextI + '_' + tableId;
            $(textarea[i]).attr('id', textareaid);
            $(textarea[i]).val('');
            textareasids.push(textareaid);
            (function(taid) {
                var ctextareaid = taid;
                $(textarea[i]).on('focus', function() {
                    startpolling(ctextareaid);
                });
            }(textareaid));
            nextI++;
        }

        if (chl) {
            var label = prompt("Please enter name for label", "New row"),
                    th = clone.find('th').first();
            var aa = $('<a href="#edittitle" ></a>');
            aa.html(label);
            if (th.length > 0) {
                $(th).html(aa);
                $(th).on('click', function() {
                    editLabel($(this), tableId);
                });
                aa.on('click', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    editLabel($(this), tableId);
                });
            }
        } else {
            th = clone.find('th').first();
            if (th.length > 0) {
                var hasDot = false;
                var html = $(th).html();
                if (html.match(/(?:^)./)) {
                    hasDot = true;
                    html = html.trim().replace('.', '');
                }

                if (isNumber(html)) {
                    html++;
                    if (hasDot)
                        html += ".";
                    $(th).html(html);

                }
            }
        }


        tr.after(clone);
        clone.find('textarea').first().focus();

        if (window.sessionStorage) {
            if (!is_ie8) {
                var map = createMap(tableId);
                window.sessionStorage.setItem(map.tableId, JSON.stringify(map, null, 2));
            }
        }
    }

    function isNumber(value) {
        if ((undefined === value) || (null === value)) {
            return false;
        }
        if (typeof value == 'number') {
            return true;
        }
        return !isNaN(value - 0);
    }

    function editLabel(el, tableId) {
        var ob = el.prop("tagName").toUpperCase() != "A" ? el.find('a') : el;
        if (el.prop("tagName").toUpperCase() == "A")
            el = el.parent();

        var html = ob.html();
        var text = $('<textarea id="changingLabel"></textarea>');
        text.val(html);
        el.html(text);

        text.on('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
        text.on('focus', function() {
            startpolling(tableId);
        });
        text.focus();
        text.on('blur', function(e) {
            html = text.val();
            text.off('click');
            text.off('blur');
            var aa = $('<a href="#edittitle" ></a>');
            aa.html(html);
            el.html(aa);
            aa.on('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                editLabel($(this), tableId);
            });
        });
    }

    function createMap(id) {
        //tableId
        //if()
        var objectMap = {},
                ob = document.getElementById(id);
        objectMap.tableId = id;
        objectMap.map = [];

        if (ob.tagName.toUpperCase() !== 'TABLE') {
            var i = 0;
            while (typeof ob.tagName != "undefined" && ob.tagName.toUpperCase() !== 'TABLE' && i < 20) {
                ob = ob.parentNode;
                i++;
            }
            if (ob.tagName.toUpperCase !== 'TABLE')
                return objectMap;

            ob = $(ob);
            objectMap.tableId = ob.attr('id');
        }

        ob = $("#" + objectMap.tableId + " tbody tr");

        var obL = ob.length;

        for (var i = 0; i < obL; i++) {

            var tempOb = {};
            tempOb.map = [];
            var obJ = $(ob[i]);
            if (!obJ.hasClass("nochange")) {

                //getting label if egzists
                var th = obJ.find('th').first();
                if (th.length > 0) {
                    var ltext = th.find('textarea');
                    if (ltext.length > 0)
                        tempOb.label = ltext.val();
                    else {
                        if (th.find('a').length > 0)
                            tempOb.label = th.find('a').html();
                        else
                            tempOb.label = th.html();
                    }
                }
                var text = obJ.find('td textarea');
                var texL = text.length;
                if (texL > 0) {
                    for (var j = 0; j < texL; j++) {
                        var textId = $(text[j]).attr('id');
                        if (id !== 'changingLabel')
                            tempOb.map.push(textId);
                    }
                }
                objectMap.map.push(tempOb);
            }
        }

        return objectMap;
    }

    function getSelectors() {

        var ob = $('select'),
                objectToStore = {};
        var leng = ob.length;
        while (leng--) {
            var tmpOb = $(ob[leng]);
            objectToStore[tmpOb.attr('id')] = ((tmpOb.val() * 1));
        }
        return objectToStore;
    }
    ;

    function loadSelectors(data) {
        if (typeof (data) === "undefined" || data === "undefined")
            return;
        data = JSON.parse(data);
        var ob = $('select');

        var leng = ob.length;
        while (leng--) {
            var tmpOb = $(ob[leng]);
            if (typeof data[tmpOb.attr('id')] !== "undefined") {
                tmpOb.val(data[tmpOb.attr('id')]);
            }
        }
        doMath();
    }
    ;

    function generateTableFromMap(map, chl) {

        if (typeof (map) === "undefined" || map === "undefined")
            return;
        try {
            var map = JSON.parse(map);


            var mapL = map.map.length;
            for (var zl = 0; zl < mapL; zl++) {
                var tr = $("#" + map.tableId + " tr").last(),
                        clone = tr.clone();
                clone.find(':text').val('');
                clone.removeClass('nochange');

                var textarea = clone.find('textarea');

                for (var i = 0, j = textarea.length; i < j; i++) {
                    var textareaid = map.map[zl].map[i];
                    $(textarea[i]).attr('id', textareaid);
                    textareasids.push(textareaid);
                    (function(taid) {
                        var ctextareaid = taid;
                        $(textarea[i]).on('focus', function() {
                            startpolling(ctextareaid);
                        });
                    }(textareaid));
                }
                if (typeof map.map[zl].label !== "undefined" && !chl) {
                    var label = map.map[zl].label,
                            th = clone.find('th').first();
                    if (th.length > 0) {
                        $(th).html(label);
                        $(th).on('click', function() {
                            editLabel($(this), map.tableId);
                        });
                    }
                } else if (chl) {
                    var label = map.map[zl].label,
                            th = clone.find('th').first();
                    var aa = $('<a href="#edittitle" ></a>');
                    aa.html(label);
                    if (th.length > 0) {
                        $(th).html(aa);
                        $(th).on('click', function() {
                            editLabel($(this), map.tableId);
                        });
                        aa.on('click', function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                            editLabel($(this), map.tableId);
                        });
                    }
                }
                tr.after(clone);
            }
        } catch (e) {
        }

    }

    /**
     * Starts periodically requesting the saving of the content of a textarea.
     * @param taid (String) The id of the textarea to save.
     */

    function startpolling(taid) {
        if (taid !== undefined && taid) {
            var localtaid = taid;
            // Enable this textarea's save button
            var itsbutton = document.getElementById("sb_" + localtaid);
            // Get this table's save all button from the textarea ID
            var thistableid = gettableidpart(localtaid, "");
            if (thistableid) {
                var thesaveallbutton = document.getElementById('sb_' + thistableid),
                        theclearallbutton = document.getElementById('cb_' + thistableid);
                if (thesaveallbutton !== null) {
                    thesaveallbutton.disabled = false;
                }
                if (theclearallbutton !== null) {
                    theclearallbutton.disabled = false;
                }
            }
            if (itsbutton !== null) {
                itsbutton.disabled = false;
            }
            if (intervalid !== null) {
                window.clearInterval(intervalid);
                intervalid = null;
            }
            // set off the saving function on this element's text
            intervalid = window.setInterval(function() {
                savesessiondata(taid);
            }, 2000);
        }
    }

    /**
     * Saves the content of individual textareas or all the textareas under a table. Should be
     * attached to a submit button automatically on setup.
     * @param (String) elementid The ID of the target textareas to save.  If the ID is a table
     *        then all the textareas under that tables will be saved.
     */

    function saveserverdata(elementid) {
        var texttosave = {},
                paramid;
        if (!elementid || typeof elementid !== 'string') {
            return null;
        }
        paramid = elementid;

        // Need to work out from the ID whether this is a table or textarea call	    
        var targetelement = document.getElementById(paramid);
        if (targetelement !== null) {
            if (targetelement.tagName.toUpperCase() === 'TEXTAREA') {
                // Final test to keep all things tidy i.e. it should pass OK if setup's not flawed
                if (textareasids.indexOf(paramid) !== -1) {
                    texttosave[paramid] = targetelement.value;
                }
            } else if (targetelement.tagName.toUpperCase() === 'TABLE') {
                // Save all the textareas under this table      
                var tabletextareas = targetelement.getElementsByTagName('textarea');
                for (tta = 0; tta < tabletextareas.length; tta++) {
                    var savebutton = document.getElementById('sb_' + tabletextareas[tta].getAttribute('id'));
                    if (savebutton !== null) {
                        // If it's disabled then ignore it as the text is already up to date
                        if (!savebutton.disabled) {
                            // Final test to keep all things tidy i.e. it should pass OK if setups not flawed
                            if (textareasids.indexOf(tabletextareas[tta].getAttribute('id')) !== -1) {
                                texttosave[tabletextareas[tta].getAttribute('id')] = tabletextareas[tta].value;
                            }
                        }
                    } else {
                        // Will all get added as the save buttons are either all there or not at all
                        if (textareasids.indexOf(tabletextareas[tta].getAttribute('id')) !== -1) {
                            texttosave[tabletextareas[tta].getAttribute('id')] = tabletextareas[tta].value;
                        }
                    }
                }
            } else {
                // Doesn't work on any other elements yet so...
                return null;
            }
        } else {
            return null;
        }

        // Get an ID for this set to help decide whether or not to disable the 'save all' button
        var testid = false;
        /*var map = createMap(elementid);
         texttosave[map.tableId] = JSON.stringify(map, null, 2);*/

        var selectors = getSelectors();
        texttosave['selectors'] = JSON.stringify(selectors, null, 2);

        /* Might need to cycle through texttosave object at this point and see what kind of scope the
         * data has.  It's all carried in the texareas ID.  Would then need to call VLE.set_server_data with
         * different params if it had say global scope at the document level.
         */
        // Call the VLE save data function as we have something to save now
        VLE.set_server_data(true, texttosave,
                function() {
                    var i;
                    for (i in texttosave) {
                        if (texttosave.hasOwnProperty(i)) {
                            // Just grab the first one as a sample to extract its table ID from
                            if (!testid) {
                                testid = i;
                            }
                            // If save op worked stop the session saving interval on this textarea
                            if (intervalid !== null) {
                                window.clearInterval(intervalid);
                                intervalid = null;
                            }
                            if (window.sessionStorage) {
                                if (!is_ie8) {
                                    // Also wipe any session data for it
                                    if (window.sessionStorage.getItem(i) !== null) {
                                        window.sessionStorage.removeItem(i);
                                    }
                                }
                            }
                            // Also disable it's save button to indicate a save op has run
                            var sbutton = document.getElementById("sb_" + i);
                            if (sbutton !== null) {
                                sbutton.disabled = true;
                            }
                        }
                    }
                    // Handle 'save all' button
                    if (testid) {
                        turnOffTablesSaveAllButton(testid);
                    }
                },
                function(message) {
                    var i;
                    if (message === null) {
                        // Do your stuff with local storage as not running on VLE					
                        for (i in texttosave) {
                            if (texttosave.hasOwnProperty(i)) {
                                // Just grab the first one as a sample to extract its table ID from
                                if (!testid) {
                                    testid = i;
                                }
                                if (window.localStorage) {
                                    if (!is_ie8) {
                                        window.localStorage.setItem(i, texttosave[i]);
                                    }
                                }
                                // If save op worked stop the session saving interval on this textarea
                                if (intervalid !== null) {
                                    window.clearInterval(intervalid);
                                    intervalid = null;
                                }
                                if (window.sessionStorage) {
                                    if (!is_ie8) {
                                        // Also wipe any session data for it
                                        if (window.sessionStorage.getItem(i) !== null) {
                                            window.sessionStorage.removeItem(i);
                                        }
                                    }
                                }
                                // Also disable its save button to indicate a save op has run
                                var sbutton = document.getElementById("sb_" + i);
                                if (sbutton !== null) {
                                    sbutton.disabled = true;
                                }
                            }
                        }
                        // Handle 'save all' button
                        if (testid) {
                            turnOffTablesSaveAllButton(testid);
                        }
                        if (!vle_saving_message_flag) {
                            alert("Any data entered in this activity will only be saved locally on this device; it will not be transferred to the main module website.");
                            vle_saving_message_flag = true;
                        }
                    } else {
                        alert("No connection. Any unsaved data will be lost if you close this browser or tab.");
                    }
                }, previous_values, null, activity_id, document_id, course_id
                );
    }

    /**
     * Saves the content of the textarea to session storage for retrieval if the browser is accidentally
     * reload or crashes.
     * @param taid (String) The id of the textarea to have it's content saved to session storage.
     * @return (Boolean) True if successful else false.
     */

    function savesessiondata(taid) {
        // Check the id's been sent
        if (taid === undefined || !taid) {
            return false;
        }
        var localtaid = taid;
        // Get the textarea with that ID
        var theta = document.getElementById(localtaid);
        // Check it exists
        if (theta === null) {
            return false;
        }
        // Get the textarea's content
        var tacontent = theta.value;
        // Write it to a session var of that name, just overwrite if it exists
        if (window.sessionStorage) {
            if (!is_ie8) {
                window.sessionStorage.setItem(localtaid, tacontent);

                /*var map = createMap(taid);
                 if (map.map.length > 0)
                 window.sessionStorage.setItem(map.tableId, JSON.stringify(map, null, 2));*/
                var selectors = getSelectors();
                window.sessionStorage.setItem('selectors', JSON.stringify(selectors, null, 2));
            }
        }
    }

    /**
     * Gets and resets data saved to session after a reload.  Checks to see if there's session data
     * around. If there is it will load that data over the top of data loaded from server or local storage
     * as that data got there as a result of the user saving it and so must be older or at least the same
     * as anthing found in session.  The session data is saved on a loop for any textareas with focus.
     */

    function getandsetsessiondata() {
        var sessionvarcount = 0, // Keep note of how many textareas have content in session
                clear_button_counter = 0,
                i = 0,
                max = textareasids.length,
                textarea = {},
                sbutton = {},
                tableid = '',
                saveallbutton = {},
                clear_all_button = {};

        // Check every textarea under management to see if it's dumped anything to session storage
        for (; i < max; i++) {
            textarea = document.getElementById(textareasids[i]);
            if (tableid === '') {
                tableid = gettableidpart(textareasids[i]);
            }
            if (window.sessionStorage) {
                if (window.sessionStorage.getItem(textareasids[i]) !== null) {
                    textarea.value = window.sessionStorage.getItem(textareasids[i]);
                    // Enable its saved button, if it's there, as it has unsaved data now
                    var sbutton = document.getElementById('sb_' + textareasids[i]);
                    if (sbutton !== null) {
                        sbutton.disabled = false;
                    }
                    // Enable the save all button now and just once as there's at least one here
                    if (sessionvarcount === 0) {
                        saveallbutton = document.getElementById('sb_' + tableid);
                        if (saveallbutton !== null) {
                            saveallbutton.disabled = false;
                        }
                    }
                    sessionvarcount++;
                }
            }
            if (textarea.value.trim() !== '') {
                clear_button_counter += 1;
            }
        }

        if (clear_button_counter > 0) {
            clear_all_button = document.getElementById('cb_' + tableid);
            if (clear_all_button !== null) {
                clear_all_button.disabled = false;
            }
        }
    }

    /**
     * Gets the table part of an ID. Which can then be used to get other elements.  Each table has a ID
     * that starts with 't' and then it's position in the DOM.  Textareas and save buttons all have similar
     * IDs that also include the ID of the table they belong to e.g. 'sb_ta1_t0' is the save button that
     * saves the content of the second textarea on the first table (counting starts at 0).
     * @param (String) baseid The base ID.
     * @return (Mixed) String/Boolean The ID of the table this baseid belongs to or false.
     */

    function gettableidpart(baseid) {
        if (typeof baseid !== 'string' || !baseid) {
            return false;
        }
        var localbaseid = baseid.toString();
        var idparts = localbaseid.split('_');
        return idparts[idparts.length - 1];
    }

    /**
     * Turns off a table's 'save all' button, if such an op's appropriate.  Needed when a 'save'
     * button has been called and so it's not clear whether or not there are others left with unsaved
     * content or if this is the last one and so there's no unsaved content on this table.
     * @param textareaid (String) The ID of one textarea on this table
     */
    function turnOffTablesSaveAllButton(textareaid) {
        var enabledtextareacount = 0;
        var thistableid = gettableidpart(textareaid);
        if (thistableid) {
            var thetable = document.getElementById(thistableid);
            if (thetable !== null) {
                var thetextareas = thetable.getElementsByTagName("textarea");
                for (t = 0; t < thetextareas.length; t++) {
                    var thetextarea = thetextareas[t];
                    // check to see if it has it's own save button and if it's enabled
                    var thesavebutton = document.getElementById('sb_' +
                            thetextarea.getAttribute('id'));
                    if (thesavebutton !== null) {
                        if (!thesavebutton.disabled) {
                            enabledtextareacount++;
                        }
                    }
                }
                // Decide whether to turn off the save all button
                if (enabledtextareacount === 0) {
                    var thesaveallbutton = document.getElementById('sb_' + thistableid);
                    if (thesaveallbutton !== null) {
                        thesaveallbutton.disabled = true;
                    }
                }
            }
        }
    }

    /**
     * Prints a HTML element.  Removes stuff from targetted tables like buttons and textarea boxes etc.
     * @param (String) tableid Optional If included will only print that table, else whole
     *         window and all tables.
     */
    function printtables(tableid) {
        // turn off all the buttons while the page is sent to the printer
        var buttonnodelist = document.getElementsByTagName('button'),
                textareanodelist = document.getElementsByTagName('textarea'),
                selectors = document.getElementsByTagName('select'),
                tablenodelist = document.getElementsByTagName('table'),
                i,
                textareacontent,
                tableclassname,
                page_elements = document.querySelector('body').children,
                max1 = page_elements.length,
                i1 = 0;

        // Go through them all and make them invisible
        for (i = 0; i < buttonnodelist.length; i++) {
            // If they are textarea 'save' buttons remove them from DOM too		
            if (buttonnodelist[i].childNodes[0].nodeValue === "Save" &&
                    buttonnodelist[i].parentNode.parentNode.tagName.toUpperCase() === "TD") {
                buttonnodelist[i].parentNode.style.display = "none";
            } else {
                buttonnodelist[i].style.visibility = "hidden";
            }
        }
        // Go through the textareas and remove them for printing
        for (i = 0; i < textareanodelist.length; i++) {
            // Get its content and, if empty, set it so the table cells don't collapse in print view
            if (textareanodelist[i].value.trim() === "") {
                textareacontent = document.createTextNode(" ");
            } else {
                textareacontent = document.createTextNode(textareanodelist[i].value);
            }
            // Get its parent
            var textareaparent = textareanodelist[i].parentNode;
            // Remove the textarea from the DOM
            textareanodelist[i].style.display = "none";
            // Add its content to a div with word wrap styles applied
            var tempdiv = document.createElement("div");
            tempdiv.className = "tempdiv";
            tempdiv.style.whiteSpace = "pre-wrap";
            tempdiv.appendChild(textareacontent);
            // Add the div to the parent for display
            textareaparent.appendChild(tempdiv);
        }
        
        for (i = 0; i < selectors.length; i++) {
            // Get its content and, if empty, set it so the table cells don't collapse in print view
            if (selectors[i].value.trim() === "") {
                textareacontent = document.createTextNode(" ");
            } else {
                textareacontent = document.createTextNode(selectors[i].value);
            }
            // Get its parent
            var textareaparent = selectors[i].parentNode;
            // Remove the textarea from the DOM
            selectors[i].style.display = "none";
            // Add its content to a div with word wrap styles applied
            var tempdiv = document.createElement("div");
            tempdiv.className = "tempdiv";
            tempdiv.style.whiteSpace = "pre-wrap";
            tempdiv.appendChild(textareacontent);
            // Add the div to the parent for display
            textareaparent.appendChild(tempdiv);
        }
        
        // Fix the width of any tables to print
        for (i = 0; i < tablenodelist.length; i++) {
            tablenodelist[i].className += " fixed_table_layout";
        }

        toggleElements(document.body);

        // Send this altered state page to the printer
        window.focus();
        window.print();

        toggleElements(document.body, 'on');

        // UnFix the width of any tables for use again after printing
        for (i = 0; i < tablenodelist.length; i++) {
            tableclassname = '';
            tableclassname = tablenodelist[i].className;
            tableclassname = tableclassname.replace(/fixed_table_layout/, '');
            tableclassname.trim(tableclassname);
            tableclassname = tableclassname.replace(/ {2,}/g, ' ');
            tablenodelist[i].className = tableclassname;
        }
        // Go through all buttons and make them visible
        for (i = 0; i < buttonnodelist.length; i++) {
            // If they are textarea 'save' buttons add them to the DOM too		
            if (buttonnodelist[i].childNodes[0].nodeValue === "Save" &&
                    buttonnodelist[i].parentNode.parentNode.tagName.toUpperCase() === "TD") {
                buttonnodelist[i].parentNode.style.display = "block";
            } else {
                buttonnodelist[i].style.visibility = "visible";
            }
        }
        // Go through the textareas and add them back to the DOM
        for (i = 0; i < selectors.length; i++) {
            // Remove the temporary div with text in from the table cell
            var elementtoremove = selectors[i].parentNode.childNodes[selectors[i].parentNode.childNodes.length - 1];
            selectors[i].parentNode.removeChild(elementtoremove);
            // Turn back on the textarea
            selectors[i].style.display = "block";
        }
        
        for (i = 0; i < textareanodelist.length; i++) {
            // Remove the temporary div with text in from the table cell
            var elementtoremove = textareanodelist[i].parentNode.childNodes[textareanodelist[i].parentNode.childNodes.length - 1];
            textareanodelist[i].parentNode.removeChild(elementtoremove);
            // Turn back on the textarea
            textareanodelist[i].style.display = "block";
        }
    }

    /**
     * Turn off for printing all elements that aren't text in tables
     * @param {Object} element The DOM element to switch children off in
     * @param {String} state Off/on whether to remove or display the elements
     */
    function toggleElements(element, state) {
        var element = element || null,
                state = state || 'off',
                child_elements = {},
                child_elements_tables = {},
                i = 0,
                max = 0;

        if (element === null) {
            return false;
        } else {
            child_elements = element.children;
        }
        if (element.className !== 'tablesContainer') {
            max = child_elements.length;
            for (; i < max; i += 1) {
                child_elements_tables = child_elements.item(i).querySelectorAll('.tablesContainer');
                if (child_elements_tables.length === 0 &&
                        child_elements.item(i).className !== 'tablesContainer') {
                    if (state === 'off') {
                        child_elements.item(i).style.display = 'none';
                    } else {
                        child_elements.item(i).style.display = 'block';
                    }
                } else {
                    toggleElements(child_elements.item(i), state);
                }
            }
        }
    }

    /**
     * Clears all the textareas and enables the save all button
     * @param {Object} e The event object
     * @param {String} table_id The ID of the table to reset
     */
    function clearAllTextInTable(e, table_id) {
        var e = e || window.event,
                target = e.target || e.srcElement,
                table_id = table_id || null,
                table = document.getElementById(table_id),
                table_submit_button = document.getElementById('sb_' + table_id),
                i = 0,
                max = 0,
                changed_counter = 0,
                text_area_save_button = {};

        if (table === null) {
            return false;
        }

        // Clear the value of any non empty textarea and enable its save button
        text_areas = table.querySelectorAll('textarea');
        max = text_areas.length;
        for (; i < max; i += 1) {
            if (text_areas[i].value.trim() !== '') {
                changed_counter += 1;
                text_areas[i].value = '';
                text_area_save_button = document.getElementById('sb_' + text_areas[i].id);
                if (text_area_save_button !== null) {
                    text_area_save_button.disabled = false;
                }
            }
        }

        // Set the save/clear all buttons to reflect what's happened
        if (changed_counter > 0) {
            table_submit_button.disabled = false;
        }
        target.disabled = true;
    }

    /** Show all the Storage data available for this webpage.
     * @param (string) type Whether it should return local, session or both
     */
    function debugshowstorage(type) {
        if (window.localStorage && window.sessionStorage) {
            console.group('Local storage:');
            for (i = 0; i < localStorage.length; i++) {
                console.log(localStorage.key(i) + ' = ' + localStorage[localStorage.key(i)]);
            }
            console.groupEnd();
            console.group('Session storage:');
            for (i = 0; i < sessionStorage.length; i++) {
                console.log(sessionStorage.key(i) + ' = ' + sessionStorage[sessionStorage.key(i)]);
            }
            console.groupEnd();
        } else {
            console.log('No storage available.');
        }
    }

    /* Some useful code to maybe deploy sometime to help with storage when the support for
     * onload is better in chrome   
     function myUnloadHandler(evt) { 	
     if (evt.persisted) {
     // This is actually a pagehide event and the page is going into the Page Cache.
     // Make sure that we don't do any destructive work, or work that shouldn't be duplicated.
     return;
     }
     // This is either an unload event for older browsers,
     // or a pagehide event for page tear-down in supported browsers.
     // It's safe to do everything my old unload event handler did here.
     }
     
     if ("onpagehide" in window) {
     window.addEventListener("pagehide", myUnloadHandler, false);
     } else {
     if (window.addEventListener) {
     window.addEventListener('unload', myUnloadHandler, false);
     } else if (window.attachEvent) {
     window.attachEvent('onunload', myUnloadHandler);		
     }
     } 
     */
    /* Might want to add load the table html in to the base html at some point
     <html> 
     <head> 
     <script src="jquery.js"></script> 
     <script> 
     $(function{
     $("#includedContent").load("b.html"); 
     });
     </script> 
     </head> 
     
     <body> 
     <div id="includedContent"></div>
     </body> 
     </html>
     
     // Also might want to load vleapi.js from texttables.js as it needs it
     $.getScript('/path/to/imported/script.js', function()
     {
     // script is now loaded and executed.
     // put your dependent JS here.
     });
     */
}());