var enabledScripts = [], // ["directory"]
    script;

// we want to check if the jQuery was loaded before (index uses a different jquery for example)
if(!window.jQuery){
    document.write('<script src="http://test-sites.internal.nativo.net/testing/js/jquery-2.2.4.min.js" async="false"></script>');
}

for (var i = 0; i < enabledScripts.length; i++) {
    script = document.createElement('script');
    script.src = 'http://test-sites.internal.nativo.net/testing/js/' + enabledScripts[i] + '.js';
    script.type = 'text/javascript';
    document.head.appendChild(script);
}
