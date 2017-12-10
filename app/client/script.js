const addMd = new Vue({
    el: '#add',
    data: {
        mdName: ''
    },
    methods: {
        createMd: function () {
            $.post('/api/md', {
                "name": this.mdName
            }, function () {
                refresh();
            }).fail(function (error) {
                alert(error.responseText);
            });
        }
    }
});

const mdList = new Vue({
    el: "#mdList",
    data: {
        mds: []
    },
    methods: {
        mdSelect: function (md) {
            editor.$data.content = md.content;
            viewer.update();
        }
    }
});

const editor = new Vue({
    el: "#editor",
    data: {
        content: ''
    }
});

const viewer = new Vue({
    el: "#viewer",
    data: {
        content: ''
    },
    methods: {
        update: function () {
            this.content = marked(editor.$data.content);
        }
    }
});

function refresh() {
    $.get('/api/md', function (response, status) {
        mdList.$data.mds = response;
    });
}

refresh();
