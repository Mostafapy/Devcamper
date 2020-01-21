// eslint-disable-next-line implicit-arrow-linebreak
const advancedResults = (model, populate) => async (req, res, next) => {
   // Copy req.query
   const reqQuery = { ...req.query };

   // Fields to exclude
   const removeFields = ['select', 'sort', 'page', 'limit'];

   // Loop over removeFields array and delete them from reqQuery
   // eslint-disable-next-line implicit-arrow-linebreak
   removeFields.forEach(param => delete reqQuery[param]);

   // Create query string
   let queryStr = JSON.stringify(reqQuery);

   // Create operator (gt, gte, etc)
   queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      // eslint-disable-next-line implicit-arrow-linebreak
      match => `${match}`,
   );

   // Finding resources
   let query = model.find(JSON.parse(queryStr));

   // Select Fields
   if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
   }

   // Sort
   if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
   } else {
      // Sort by date
      query = query.sort('-createdAt');
   }

   // Pagination
   const page = parseInt(req.query.page, 10) || 1;
   const limit = parseInt(req.query.limit, 10) || 25;
   const startIndex = (page - 1) * limit;

   const endIndex = page * limit;

   const total = await model.countDocuments();

   query.skip(startIndex).limit(limit);

   if (populate) {
      query = query.populate(populate);
   }

   // Executing query
   const results = await query;

   // Pagination result
   const pagination = {};

   if (endIndex < total) {
      pagination.next = {
         page: page + 1,
         limit,
      };
   }
   if (startIndex > 0) {
      pagination.perv = {
         page: page - 1,
         limit,
      };
   }
   res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
   };

   next();
};

module.exports = advancedResults;
