
function cancelOrder(oid) {
  $.ajax({
    type: 'POST',
    data: {
      orderId: oid,
    },
    url: `/admin/order/cancel`,
    success: function (rs) {
      alert('Hủy đơn hàng thành công');
      window.location.reload();
    },
  });
}
function onClickResetReview() {
  document.getElementById('bTitle').value = '';
}
function onClickResetAUthor() {
  document.getElementById('name').value = '';
}
function onClickResetPromotion() {
  document.getElementById('pTitle').value = '';
}
function onClickReset() {
  document.getElementById('idSearch').value = '';
  document.getElementById('status').value = '';
  document.getElementById('paid').value = '';
}
function onClickResetProduct() {
  document.getElementById('title').value = '';
  document.getElementById('category').value = '';
  document.getElementById('rate').value = '';
  document.getElementById('author').value = '';
}
function onClickResetUser() {
  document.getElementById('username').value = '';
  document.getElementById('isActive').value = '';
  document.getElementById('email').value = '';
  document.getElementById('fullName').value = '';
}
function blockUser(id) {
  $.ajax({
    type: 'POST',
    url: `/admin/user/disable/${id}`,
    success: function (rs) {
      alert('disable success');
      window.location.reload();
    },
  });
}
function activeUser(id) {
  $.ajax({
    type: 'POST',
    url: `/admin/user/active/${id}`,
    success: function (rs) {
      alert('active success');
      window.location.reload();
    },
  });
}
function editProduct(id) {
  $.ajax({
    type: 'GET',
    url: `/admin/book/${id}`,
    success: function (rs) {
      if (rs.s === 200) {
        let data = rs.data;
        // set data vừa get đc lên <input>
        document.getElementById('_idEdit').value = data.id;
        document.getElementById('nameEdit').value = data.title;
        document.getElementById('priceEdit').value = data.price;
        document.getElementById('categoriEdit').value = data.categoryId;
        document.getElementById('descriptionEdit').value = data.description;
        document.getElementById('imageUrlEdit').value = data.imageUrl;
        document.getElementById('imageUploadEdit').src = data.imageUrl;
        document.getElementById('authorEdit').value = data.authorId;
        document.getElementById('limitDiscountEdit').value = data.limitDiscount;
      }
    },
  });
}
function editPromotion(id) {
  $.ajax({
    type: 'GET',
    url: `/admin/promotion/detail/${id}`,
    success: function (rs) {
      if (rs.s === 200) {
        let data = rs.data;
        // set data vừa get đc lên <input>
        document.getElementById('_idEdit').value = data._id;
        document.getElementById('codeEdit').value = data.code;
        document.getElementById('nameEdit').value = data.name;
        document.getElementById('GiamGiaEdit').value = data.GiamGia;
        document.getElementById('startDateEdit').value = data.startDate;
        document.getElementById('endDateEdit').value = data.endDate;
        document.getElementById('descEdit').value = data.desc;
      }
    },
  });
}
function editcategory(id) {
  $.ajax({
    type: 'GET',
    url: `/admin/category/detail/${id}`,
    success: function (rs) {
      if (rs.s === 200) {
        let data = rs.data;
        // set data vừa get đc lên <input>
        document.getElementById('nameEdit').value = data?.name;
        document.getElementById('descriptionEdit').value = data?.description;
        document.getElementById('_idEdit').value = data?.id;
      }
    },
  });
}
function editAuthor(id) {
  $.ajax({
    type: 'GET',
    url: `/admin/author/detail/${id}`,
    success: function (rs) {
      if (rs.s === 200) {
        let data = rs.data;
        // set data vừa get đc lên <input>
        document.getElementById('nameEdit').value = data?.name;

        document.getElementById('_idEdit').value = data?.id;
      }
    },
  });
}
function deleteBook(id) {
  $.ajax({
    type: 'POST',
    url: `/admin/book/disable/${id}`,
    success: function (rs) {
      alert('disable success');
      window.location.reload();
    },
  });
}
function deletecategory(id) {
  $.ajax({
    type: 'POST',
    url: `/admin/category/disable/${id}`,
    success: function (rs) {
      alert('disable success');
      window.location.reload();
    },
  });
}
function deleteAuthor(id) {
  $.ajax({
    type: 'POST',
    url: `/admin/author/disable/${id}`,
    success: function (rs) {
      alert('disable success');
      window.location.reload();
    },
  });
}
function deletePromotion(id) {
  $.ajax({
    type: 'POST',
    url: `/admin/promotion/disable/${id}`,
    success: function (rs) {
      alert('díable success');
      window.location.reload();
    },
  });
}
function activePromotion(id) {
  $.ajax({
    type: 'POST',
    url: `/admin/promotion/active/${id}`,
    success: function (rs) {
      alert('active success');
      window.location.reload();
    },
  });
}
function activeCategory(id) {
  $.ajax({
    type: 'POST',
    url: `/admin/category/active/${id}`,
    success: function (rs) {
      alert('active success');
      window.location.reload();
    },
  });
}
function activeAuthor(id) {
  $.ajax({
    type: 'POST',
    url: `/admin/author/active/${id}`,
    success: function (rs) {
      alert('active success');
      window.location.reload();
    },
  });
}
function activeBook(id) {
  $.ajax({
    type: 'POST',
    url: `/admin/book/active/${id}`,
    success: function (rs) {
      alert('active success');
      window.location.reload();
    },
  });
}
function uploadImage() {
  var fileInput = document.getElementById('image_file');
  var file = fileInput.files[0];
  if (!file) {
    return alert('Vui lòng chọn ảnh');
  }
  var formData = new FormData();
  formData.append('file', file);

  $.ajax({
    url: '/admin/book/image',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      document.getElementById('imageUpload').src = response.secure_url;
      document.getElementById('imageUrl').value = response.secure_url;
    },
    error: function (xhr, status, error) {
      // Xử lý lỗi
    },
  });
}
function uploadImageForEdit() {
  var fileInput = document.getElementById('image_file_edit');
  var file = fileInput.files[0];
  if (!file) {
    return alert('Vui lòng chọn ảnh');
  }
  var formData = new FormData();
  formData.append('file', file);

  $.ajax({
    url: '/admin/book/image',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      document.getElementById('imageUploadEdit').src = response.secure_url;
      document.getElementById('imageUrlEdit').value = response.secure_url;
    },
    error: function (xhr, status, error) {
      // Xử lý lỗi
    },
  });
}
