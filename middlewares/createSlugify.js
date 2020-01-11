const slugify = require('slugify');

const createSlugifyFromName = modelSchema => {
   // eslint-disable-next-line func-names
   modelSchema.pre('save', function(next) {
      this.slug = slugify(this.name, { lower: true });
      next();
   });
};

module.exports = createSlugifyFromName;
