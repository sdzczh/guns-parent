/**
 * 初始化商品管理详情对话框
 */
var GoodsInfoDlg = {
    goodsInfoData : {}
};

/**
 * 清除数据
 */
GoodsInfoDlg.clearData = function() {
    this.goodsInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
GoodsInfoDlg.set = function(key, val) {
    this.goodsInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
GoodsInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
GoodsInfoDlg.close = function() {
    parent.layer.close(window.parent.Goods.layerIndex);
}

/**
 * 收集数据
 */
GoodsInfoDlg.collectData = function() {
    this
    .set('id')
    .set('name')
    .set('time');
}

/**
 * 提交添加
 */
GoodsInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/goods/add", function(data){
        Feng.success("添加成功!");
        window.parent.Goods.table.refresh();
        GoodsInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.goodsInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
GoodsInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/goods/update", function(data){
        Feng.success("修改成功!");
        window.parent.Goods.table.refresh();
        GoodsInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.goodsInfoData);
    ajax.start();
}

$(function() {

});
