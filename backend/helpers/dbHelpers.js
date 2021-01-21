module.exports = db => {
  // eslint-disable-next-line no-unused-vars
  const getReviews = (lng, lat) => {
    const query = {
      text: `SELECT reviews.review, reviews.rating, users.username
      FROM users
      JOIN tenancies ON users.id = tenancies.user_id
      JOIN reviews ON tenancies.id = reviews.tenancy_id
      JOIN properties ON reviews.property_id = properties.id
      JOIN categories ON reviews.category_id = categories.id
      WHERE properties.longitude = $1
      AND properties.latitude = $2
      AND categories.id = 1`,
      values: [lng, lat],
    };
    return db
      .query(query)
      .then(result => result.rows)
      .catch(err => err);
  };

  const login = (username, password) => {
    const query = {
      text: `SELECT * FROM users where username = $1 and password = $2`,
      values: [username, password],
    };
    return db
      .query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  // const saveReview = (propertyReview, landlordReview, neighbourhoodReview) => {
  //   const query = {
  //     text: `
  //       INSERT INTO reviews(review, rating, category_id, property_id, tenancy_id)
  //       VALUES($1, 1, 3, 1, 1);

  //       INSERT INTO reviews(review, rating, category_id, property_id, tenancy_id)
  //       VALUES($2, 4, 2, 1, 1);

  //       INSERT INTO reviews(review, rating, category_id, property_id, tenancy_id)
  //       VALUES($3, 1, 1, 1, 1);
        
  //       `,
  //     values: [landlordReview, neighbourhoodReview, propertyReview],
  //   };
  //   return db
  //     .query(query)
  //     .then(result => result.rows)
  //     .catch(e => e);
  // };

  const signup = (signupUser, signupPass) => {
    const query = {
      text: `INSERT INTO users(username, password) VALUES($1, $2)
      RETURNING *
      `,
      values: [signupUser, signupPass],
    };
    
    return (
      db
        .query(query)
        
        .then(result => result.rows)
        .catch(e => e)
    );
  };

  return {
    getReviews,
    login,
    // saveReview,
    signup,
  };
};
