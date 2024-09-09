CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
drop table categories
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
	stock_quantity INT NOT NULL,
    sold_quantity INT NOT NULL DEFAULT 0,
    image VARCHAR(255),
    category_id INTEGER REFERENCES categories(id)
	
);
drop table books
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    address VARCHAR(255) NOT NULL

);
select * from users
drop table users
-- Tạo bảng admin
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);
drop table admin
INSERT INTO admin (username, password)
VALUES ('admin', '123');
INSERT INTO categories (name) VALUES
('Kinh tế'),
('Sách giáo khoa'),
('Thiếu nhi'),
('Ngoại ngữ');

INSERT INTO books (title, description, price, stock_quantity,image, category_id) VALUES
('Mega Livestream - Bề Nổi Tảng Băng Chìm', 'Bóc trần sự thật về hiện tượng Mega Livestream và trang bị cho bạn kiến thức, chiến lược để chinh phục thị trường đầy tiềm năng này!', 62.30,50, '../images/megalivestream-31082024-1.jpg', 1),
('CẨM NANG TÀI CHÍNH','Cẩm Nang Tài Chính Cho Thanh Thiếu Niên - Cuốn sách này là cẩm nang hướng dẫn cho bạn về các vấn đề tiền bạc, từ sự khác biệt giữa cổ phiếu và trái phiếu, cho tới những cách để tiến hành các khoản đầu tư tiềm năng.',  54.00, 20,  '../images/camnangtaichinh.jpg',1),
('QUY TẮC SỐ 1','Quy Tắc Số 1 - Chiến Lược Đơn Giản Để Đầu Tư Hiệu Quả Chỉ Với 15 Phút Mỗi Tuần phù hợp với những ai mong muốn tìm hiểu về đầu tư chứng khoán một cách đơn giản, có hệ thống và muốn tự mình quản lý tài chính cá nhân.',  17.00, 66,  '../images/quytac.jpg',1),
('BÍ MẬT TƯ DUY TRIỆU PHÚ','Bí Mật Tư Duy Triệu Phú - ​Cuốn sách dành cho những ai còn loay hoay muốn tìm đường đến sự giàu có và thành công.',  50.25, 24,  '../images/sach-bi-mat-tu-duy-trieu-phu_L.jpg',1),
('BÀI TẬP HÌNH HỌC 11','Phương Pháp Giải Toán Chuyên Đề Hình Học 11 (Dùng Chung Cho Các Bộ SGK Hiện Hành) - Tập hợp những kiến thức trọng tâm và các dạng toán từ cbản đến nâng cao môn Hình Học 11.',  11.00, 40, '../images/sach-phuong-phap-giai-toan-chuyen-de-hinh-hoc-11_L.jpg',2),
('ÔN LUYỆN NGỮ VĂN 12','Giúp học sinh có thêm tài liệu để tự học tập, tự rèn luyện, tự bồi dưỡng, nâng cao kiến thức và làm tốt hơn các bài kiểm tra tại lớp, các bài thi học kì môn Ngữ văn.',20.00,35,'../images/nguvan12.jpg',2),
('BÀI TẬP TOÁN 12','Câu Hỏi Và Bài Tập Bồi Dưỡng Học Sinh Giỏi Toán 12 (Dùng Chung ChoCác Bộ SGK Hiện Hành) giúp các em có được tài liệu tham khảo dùng đểrèn luyện và phát triển các năng lực và phẩm chất học sinh giỏi toán',15.000,4,'../images/toan12.jpg',2),
('BÀI TẬP VẬT LÍ 11','Phương Pháp Giải Bài Tập Vật Lí Theo Chủ Đề 11” là cuốn sáchđược biên soạn nhằm giúp cho các bạn học sinh có một tàiliệu tham khảo thiết thực và ích bổ ích về môn vật lí với 18chủ đề',19.00,75,'../images/phuongphapgiaivatlitheochuyendevatli1198000_L.jpg',2),
('10 VẠN CÂU HỎI VÌ SAO','Học tập và khám phá thế giới loài cá và thế giới loài chim qua cuốn sách "10 vạn câu hỏi vì sao- tập 2" của tác giả Thanh Huệ.',   10.00, 60,  '../images/10vancauhoivisao.jpg',3),
('TRUYỆN NGỤ NGÔN TẬP ĐỌC','Truyện Ngụ Ngôn Cho Bé Tập Đọc gồm những câu chuyện đầu tiên khi bắt đầu học chữ , dung lượng chữ phù hợp với các bé bắt đầu tập đọc. Sách in chữ to, sách còn có tranh minh họa sinh động giúp các bé hứng thú khi đọc sách.', 17.00, 90,  '../images/truyenngungon.jpg',3),
('BASIC WORDS','Combo 4 Cuốn Basic Words - Bộ sách hoàn toàn sử dụng bằng tiếng anh 100% giúp bé được “tắm ngôn ngữ” trong chính ngôn ngữ đó. Đấy cũng chính là cách mà các bố mẹ hiện đại dạy con ngôn ngữ mới',  7.00, 40,  '../images/basicwords.jpg',3),
('TẬP TÔ CHỮ CÁI','Xe Kem Ngọt Mùa Hè - Với 30 chủ đề tô màu phong phú đa dạng, mỗi bức tranh là một kỷ niệm, giúp bạn ôn lại những khoảnh khắc đáng nhớ nhất trong tuổi thơ.',  5.00, 85, '../images/sach-luyen-tay-cam-but-tap-to-chu-cai-1-1_L.jpg',3),
('360 ĐỘNG TỪ BẤT QUY TẮC','360 Động Từ Bất Quy Tắc Và Cấu Trúc Câu Trong Tiếng Anh cung cấp vốn động từ phong phú giúp bạn cải thiện vốn tiếng Anh của mình',  20.00, 50,  '../images/360-dong-tu-bat-quy-tac-bia-truoc_L.jpg',4),
('CHINH PHỤC TIẾNG ANH','Chinh Phục Tiếng Anh - Bí Quyết Nắm Vững Kiến Thức Tiếng Anh Dành Cho Người Mới Bắt Đầu - Sách tổng hợp tất cả các điểm ngữ pháp Tiếng Anh đặc biệt là các nội dung được biên soạn theo chuẩn chương trình sách Tiếng Anh mới.',  45.00, 23, '../images/chinhphuc.jpg',4),
('NGỮ PHÁP TIẾNG ANH','Ngữ Pháp Tiếng Anh - Lý Thuyết Và Bài Tập Thực Hành đề cập đến những vấn đề ngữ pháp thông dụng, cần thiết cho người học tiếng Anh ở mọi trình độ. Với lượng kiến thức đầy đủ, phương pháp trình bày khoa học, rõ ràng, dễ hiểu, kèm theo phần ghi chú, giải thích.',  30.00, 29,  '../images/nguphap.jpg',4),
('TỪ VỰNG CƠ BẢN', 'Từ Vựng Tiếng Anh Cơ Bản (30 Chủ Đề Phổ Biến Nhất - Sbooks) hướng đến việc đưa ra những từ vựng thông dụng trong các chủ đề thường gặp, bên cạnh đó cuốn sách cũng giới thiệu các mẫu câu cơ bản mang tính thực hành giúp người đọc trau dồi những từ vựng được mình ghi nhớ.', 35.00, 39,  '../images/tuvungcoban.jpg',4);







