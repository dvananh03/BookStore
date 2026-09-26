export interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: any;
  description: string;
}

export const BOOKS_DATA: Book[] = [
  {
    id: 1,
    title: 'Nhà giả kim',
    author: 'Paulo Coelho',
    price: '89.000đ',
    originalPrice: '110.000đ',
    discount: '-20%',
    image: require('../assets/Nhà_giả_kim.jpg'),
    description:
      'Tất cả những trải nghiệm trong chuyến du hành theo đuổi vận mệnh của Santiago đã giúp anh thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người.\n\nNhà giả kim là một trong những cuốn sách bán chạy nhất mọi thời đại. Tác phẩm kể về hành trình của Santiago, một cậu bé chăn cừu người Tây Ban Nha, đi tìm kho báu ở Kim Tự Tháp Ai Cập. Trên đường đi, cậu học được cách lắng nghe trái tim mình, đọc các dấu hiệu từ vũ trụ và nhận ra rằng kho báu thực sự đôi khi lại nằm ngay tại nơi bắt đầu.',
  },
  {
    id: 2,
    title: 'Đắc nhân tâm',
    author: 'Dale Carnegie',
    price: '95.000đ',
    originalPrice: '120.000đ',
    discount: '-20%',
    image: require('../assets/Đắc_nhân_tâm.jpg'),
    description:
      'Đắc nhân tâm (How to Win Friends and Influence People) của Dale Carnegie là cuốn sách nghệ thuật giao tiếp đỉnh cao và bán chạy nhất thế giới.\n\nCuốn sách mang lại những lời khuyên thiết thực về cách ứng xử, giao tiếp và kết nối với mọi người trong cuộc sống cũng như công việc. Những nguyên tắc trong Đắc nhân tâm giúp người đọc thấu hiểu bản thân, tạo thiện cảm với người đối diện, và trở thành một người lãnh đạo truyền cảm hứng.',
  },
  {
    id: 3,
    title: 'Tuổi trẻ đáng giá bao nhiêu?',
    author: 'Rosie Nguyễn',
    price: '120.000đ',
    image: require('../assets/Tuổi_trẻ.jpg'),
    description:
      'Tuổi trẻ đáng giá bao nhiêu? là cuốn sách truyền cảm hứng học tập và rèn luyện bản thân dành riêng cho các bạn trẻ Việt Nam.\n\nCuốn sách gồm 5 phần: Học gì, Làm gì, Đi đâu, Đam mê là gì và Tuổi trẻ tỏa sáng. Tác giả chia sẻ những kinh nghiệm thực tế về đọc sách, tự học, đi du lịch bụi và tìm kiếm định hướng tương lai. Đây là kim chỉ nam giúp thế hệ trẻ sống rực rỡ và không hối tiếc.',
  },
  {
    id: 4,
    title: 'Tôi tài giỏi, bạn cũng thế',
    author: 'Adam Khoo',
    price: '110.000đ',
    image: require('../assets/toi-tai-gioi-ban-cung-the-1.webp'),
    description:
      'Tôi tài giỏi, bạn cũng thế của doanh nhân Adam Khoo chia sẻ những phương pháp học tập siêu việt giúp bất kỳ học sinh nào cũng có thể bứt phá thành tích.\n\nTác phẩm hướng dẫn chi tiết các kỹ năng quan trọng như: Sơ đồ tư duy (Mind Mapping), Kỹ thuật ghi nhớ siêu tốc, Phương pháp đọc nhanh và Quản lý thời gian hiệu quả. Cuốn sách không chỉ giúp nâng cao kết quả học tập mà còn tiếp thêm niềm tin vào năng lực bản thân.',
  },
];
