var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, maxlength: 100},
        family_name: {type: String, required: true, maxlength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    }
);

AuthorSchema.virtual('name').get(function() {
    var fullname = '';
    if (this.first_name && this.family_name) {
        fullname = this.family_name + ', ' + this.first_name;
    }
    if (!this.first_name || !this.family_name) {
        fullname = '';
    }
    return fullname;
});

AuthorSchema.virtual('url').get(function () {
    return '/catalog/author/' + this._id;
});

const format_date = (date) => {
    return date ? moment(date).format('MMM Do, YYYY') : '';
}

AuthorSchema.virtual('lifespan').get(function() {
    const dob = format_date(this.date_of_birth);
    const dod = format_date(this.date_of_death);
    return dob && dod ? `(${dob} - ${dod})` : dob ? `(${dob})` : '';
})

module.exports = mongoose.model('Author', AuthorSchema);
