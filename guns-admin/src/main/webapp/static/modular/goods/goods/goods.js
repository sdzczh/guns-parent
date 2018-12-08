/**
 * 商品管理管理初始化
 */
var Goods = {
    id: "GoodsTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Goods.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'name', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'time', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Goods.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Goods.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加商品管理
 */
Goods.openAddGoods = function () {
    var index = layer.open({
        type: 2,
        title: '添加商品管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/goods/goods_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看商品管理详情
 */
Goods.openGoodsDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '商品管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/goods/goods_update/' + Goods.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除商品管理
 */
Goods.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/goods/delete", function (data) {
            Feng.success("删除成功!");
            Goods.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("goodsId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询商品管理列表
 */
Goods.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Goods.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Goods.initColumn();
    var table = new BSTable(Goods.id, "/goods/list", defaultColunms);
    table.setPaginationType("client");
    Goods.table = table.init();
});
