const addMd = new Vue({
    el: '#add',
    data: {
        mdName: ''
    },
    methods: {
        createMd: function () {
            this.mdName = this.mdName.trim();
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
            editor.content = md.content;
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
                refresh();
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
                mdList.selected = '';
                editor.content = '';
                refresh();
            }).fail(function (error) {
                alert(error.responseText);
            });
        }
    }
});

const viewer = new Vue({
    el: "#viewer",
    computed: {
        getMd: function () {
            return marked(editor.content);
        }
    }
});

function refresh() {
    addMd.mdName = '';
    $.get('/api/md', function (response, status) {
        mdList.mds = response.reverse();
    });
}

refresh();
