export default {
  app: state => state.App.app,
  zIndex: state => state.App.zIndex,
  userName: state => state.User.userName,
  userAvatar: state => state.User.userAvatar,
  backgroundImgUrl: state => state.User.backgroundImgUrl,
  theme: state => state.User.theme
}