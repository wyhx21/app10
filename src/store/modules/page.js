export default {
  namespaced: true,
  modules: {},
  state: {
    style: {
      dividerStyle: {
        color: "#1989fa",
        borderColor: "#1989fa",
        padding: "0 16px",
        margin: "5px"
      },
      popupQueryParam: {
        height: "100%",
        width: "70%"
      }
    },
    msg: {
      finishedText: "我也是有底线的..."
    }
  },
  getters: {
    dividerStyle: _state => _state.style.dividerStyle,
    popupQueryParamStyle: _state => _state.style.popupQueryParam,
    finishedText: _state => _state.msg.finishedText
  }
};
