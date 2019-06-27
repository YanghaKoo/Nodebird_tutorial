module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // 테이블명은 users
    nickname: {
      type: DataTypes.STRING(20), // 20글자 이하
      allowNull: false, // 필수
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true, // 고유한 값
    },
    password: {
      type: DataTypes.STRING(100), // 100글자 이하
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글이 저장돼요
  });

  User.associate = (db) => {
    db.User.hasMany(db.Post, { as: 'Posts' }); // User오 Post간의 다른테이블도 있어서 as로 해줌, 관계가 불분명 해지니깐!! 나중에 접근할땐 as로 쓴 Post에 접근하면 됨
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });

    // belongstomany는 웬만하면 as를 달아라
    // 팔로잉 팔로워의 경우 through가 같아서 구별 불가 --> as로 구분 필요
    // Liked라는 컬럼으로 지금 user파일이니까 사용자 입장에서, Liked란 이름으로 좋아요 누른 게시물들을 받아오겠다 
    // as가 사용자가 가져올 때 as를 기준으로 가져오게 되어서 좋음
  };

  return User;
};