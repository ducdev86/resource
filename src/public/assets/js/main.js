var dataAddress = [
  ["Khu vực 1", "Khu vực 2", "Khu vực 3", "Khu vực 4", "Khu vực 5"],
  ["Khu A", "Khu B", "Gò Cao", "Sò Đo"],
  ["Khu vực 1", "Khu vực 2", "Khu vực 3", "Khu vực 4", "Khu vực 5"],
  ["Hòa Hiệp 1", "An Hưng", "An Định", "An Thuận", "An Hiệp"],
  ["An Thủy", "An Hòa", "Sơn Lợi", "An Thạnh", "An Ninh"],
  ["Ấp 1", "Ấp 2", "Ấp 3", "Ấp 4", "Ấp 5"],
  ["Bình Tả 1", "Bình Tả 2", "Bình Tiền 1", "Bình Tiền 2"],
  [
    "Nhơn Hòa 1",
    "Nhơn Hòa 2",
    "Hậu Hòa 1",
    "Hậu Hòa 2",
    "Bình Hữu 1",
    "Bình Hữu 2",
  ],
  ["Ấp Chánh", "Tân Hoà", "Bào Sen", "Đức Hạnh I", "Đức Hạnh II"],
  ["Đức Ngãi I", "Đức Ngãi II", "Tân Hội", "Ấp Chánh"],
  [
    "Hòa Thuận I",
    "Hòa Thuận II",
    "Hòa Bình I",
    "Hòa Bình II",
    "Hòa Hiệp I",
    "Hòa Hiệp II",
  ],
  ["Giồng Ngang", "Bình Thủy", "Bình Lợi", "Thôi Môi"],
  ["Thuận Hòa I", "Thuận Hòa II", "Xuân Khánh I", "Xuân Khánh II"],
  ["Tân Bình", "Lập Thành", "Hốc Thơm I", "Hốc Thơm II", "Bùng Binh"],
  ["Ấp 1A", "Ấp 1B", "Ấp 2", "Ấp 3A", "Ấp 3B", "Ấp 4"],
  [
    "Lộc Bình",
    "Lộc Hòa",
    "Lộc Hưng",
    "Lộc An",
    "Lộc Thạnh",
    "Lộc Chánh",
    "Lộc Thuận",
  ],
  ["Tràm Lạc", "Rừng Dầu", "Rừng Sến"],
  ["Mới I", "Mới II", "Giồng Lớn"],
  ["Bến Long", "Ấp Chánh", "Chánh Hội", "Lập Điền", "Bàu Công", "Rừng Dầu"],
  [
    "Ấp Chánh",
    "Bàu Trai Hạ",
    "Bàu Trai Thượng",
    "Tân Quy Thượng",
    "Tân Quy Hạ",
    "Gò Sao",
    "Bình Thủy",
  ],
];
$(document).ready(function () {
  var add_1 = $("#add-1");
  var add_2 = $("#add-2");
  var postId;
  var buttonDeletePost = $("#button-delete-post");
  var buttonRenewPost = $("#button-renew-post");
  var formDeletePost = document.forms["form-delete-post"];
  var formRenewPost = document.forms["form-renew-post"];

  add_1.on("change", function () {
    render_address_2($(this).val(), add_2);
  });

  $("#deleteModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    postId = button.data("id");
  });

  $("#renewModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    postId = button.data("id");
  });

  buttonRenewPost.on("click", function () {
    formRenewPost.action = "/admin/" + postId + "?_method=PATCH";
    formRenewPost.submit();
  });

  buttonDeletePost.on("click", function () {
    formDeletePost.action = "/admin/" + postId + "?_method=DELETE";
    formDeletePost.submit();
  });
});

function render_address_2(val, address) {
  var content = dataAddress[val].map(function (item) {
    return "<option>" + item + "</option>";
  });
  content.join("");
  address.html(content);
}
