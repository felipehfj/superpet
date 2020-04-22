const fn = {
    makeId: function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    makeEmail: function () {
        return `${this.makeId(5)}@${this.makeId(5)}.com`
    },

    makeUser: function () {
        return `${this.makeId(6)} ${this.makeId(7)}`
    }

}

module.exports = fn;