/*
There are many URLs for the Ad Server QA publication that are not
human readable. This file allows the user to specify a human-readble
hash that redirects to the less intuitive URL structure.
*/
var Directory = Directory || {};

Directory = new function() {
    this.hashExists = function() {
        var hash = window.location.hash;
        return hash ? hash.slice(1, hash.length) : 0;
    }
    this.checkHash = function() {
        var currentHash = this.hashExists();
        if (Object.keys(this.mapping).indexOf(currentHash) > -1)
            window.location.replace(this.mapping[currentHash]);
    }
    this.monitorHashChange = function() {
        // REQUIRES JQUERY
        if (window.jQuery) {
            $(window).bind('hashchange', function(e) {
                Directory.checkHash();
            });
        } else
            setTimeout(this.monitorHashChange, 250);
    }
    this.mapping = {
        'home': 'http://test-sites.internal.nativo.net/testing/',
        'standard': 'http://test-sites.internal.nativo.net/testing/?ntv_tm=tout&ntv_pl=1039515&ntv_opt=27884&ntv_cache=0'
    }
    this.createMenu = function() {
        var title;
        // Create menu container
        Directory.createMenuContainer();
        Directory.populateMenuContainer('menu');
        // Listen for menu clicks
        Directory.initEventListener();
    }

    this.populateMenuContainer = function(cssId){
        for (key in Directory.mapping) {
            // Format keys in Directory.mapping hashtable
            title = Directory.formatName(key);
            // Create menu items
            Directory.createMenuItems(title, key, Directory.mapping[key], cssId);
        }
    }

    this.capitalizeString = function(str) {
        // Capitalize every first letter
        return str.replace(/\b\w/g, function(l) { return l.toUpperCase(); });
    }
    this.formatName = function(str) {
        // List of words/acronyms to capitalize
        var capitals = ['dfp', 'dsp', 'css', 'api', 'ntv', 'cpv', 'cpm', 'vcpm', 'cpcv'];
        // Replace underscore ("_") with space
        str = str.replace(/_/g, ' '); //Directory.capitalizeString(str).replace(/_/g, ' ');
        // Check if words/acronyms exist in str arg
        for (var i = 0; i < capitals.length; i++) {
            if (str.indexOf(capitals[i]) > -1) {
                str = str.replace(capitals[i].toLowerCase(), capitals[i].toUpperCase());
            }
        }
        return Directory.capitalizeString(str)
    }
    this.createMenuContainer = function() {
        // Creates menu container that wraps menu items
        var h = document.createElement('ul'),
            b;
        h.id = 'menu';
        h.className = 'hidden';
        if (document.querySelector('body'))
            document.querySelector('body').appendChild(h);
        else {
            setTimeout(function() {
                document.querySelector('body').appendChild(h)
            }, 100);
        }
    }
    this.createMenuItems = function(title, text, link, cssID) {
        // Creates menu items that are inside of menu container
        var h = document.createElement('li'),
            a = document.createElement('a'),
            m;
        h.className = 'item',
        a.innerText = title,
        a.title = text,
        a.href = link;
        h.appendChild(a)
        m = document.getElementById(cssID);
        if (m)
            m.appendChild(h)
        else {
            setTimeout(function() {
                document.getElementById(cssID).appendChild(h)
            }, 300);
        }
    }
    this.initEventListener = function() {
        // When user clicks menu icon, show menu items
        setTimeout(function() {
            $('#menu').on('click', function() {
                $(this).toggleClass('hidden');
            });
        }, 500);
        /* If user clicks something other than menu icon
           or items in menu, hide the menu */
        // $(document).mouseup(function(e) {
        //     var menu = $('#menu');
        //     if (!menu.is(e.target) && menu.has(e.target).length === 0) {
        //         menu.toggleClass('hidden');
        //     }
        // });
        }
}
!function (Directory) {
    window.onload = function() {
        // Listen for hash changes in URL
        Directory.monitorHashChange();

        // Check if hash is in URL
        if (Directory.hashExists())
            Directory.checkHash();

        // Create the menu
        Directory.createMenu();
    }
}(Directory)
