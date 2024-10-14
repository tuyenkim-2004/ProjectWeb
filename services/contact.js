function subFunction(){
    var name = document.getElementById('name').value;
    var email= document.getElementById('email').value;
    var  number_phone = document.getElementById('number_phone').value;
    var form_contact=document.getElementById('form_contact').value;
    var messageError = document.getElementById('error-message');
      // Kiểm tra nếu cả hai ô đều trống
      if (name === "" || email === "" || number_phone ==="" || form_contact === "") {
        messageError.textContent = "Vui lòng nhập vào tất cả các trường.";
        return false; // Ngăn form được gửi
    } else {
        messageError.textContent = ""; // Xóa thông báo lỗi nếu tất cả hợp lệ
        
    }
}
