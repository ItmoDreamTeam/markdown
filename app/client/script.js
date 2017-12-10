const addMd = new Vue({
    el: '#add',
    data: {
        mdName: ''
    },
    methods: {
        createMd: function () {
            if (this.mdName === '') return;
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
        selected: '',
        mds: []
    },
    methods: {
        mdSelect: function (md) {
            this.selected = md._id;
            editor.$data.content = md.content;
        }
    }
});

const editor = new Vue({
    el: "#editor",
    data: {
        content: ''
    },
    methods: {
        save: function () {
            if (mdList.selected === '') return;
            $.ajax({
                url: '/api/md/' + mdList.selected,
                method: 'PUT',
                data: {
                    "content": this.content
                }
            }).done(function () {
                //
            }).fail(function (error) {
                alert(error.responseText);
            });
        },
        mdDelete: function () {
            if (mdList.selected === '') return;
            $.ajax({
                url: '/api/md/' + mdList.selected,
                method: 'DELETE'
            }).done(function () {
                refresh();
            }).fail(function (error) {
                alert(error.responseText);
            });
        }
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
    addMd.$data.mdName = '';
    mdList.$data.selected = '';
    $.get('/api/md', function (response, status) {
        mdList.$data.mds = response;
    });
}

refresh();
