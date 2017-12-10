new Vue({
    el: '#add',
    data: {
        mdName: ''
    },
    methods: {
        createMd: function () {
            $.post('/api/md', {
                    "name": this.mdName
            }, function (response, status) {
                console.log(status + ": " + response);
            });
        }
    }
});
