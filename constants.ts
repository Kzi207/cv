
import { Project, Skill, Track, Education, TimelineItem, FocusArea } from './types';
import { Cpu, Globe, Bot, Zap, Layout, Wifi } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Lê Khánh Duy",
  title: "Sinh viên Cơ điện tử - CTUT",
  title_en: "Mechatronics Student - CTUT",
  email: "kzi221107@gmail.com",
  phone: "0939 042 183",
  address: "Cần Thơ, Việt Nam",
  github: "https://github.com/kzi207",
  facebook: "https://fb.com/kzi207",
  zalo: "https://zalo.me/0939042183",
  about: "Xin chào! Mình là Lê Khánh Duy, sinh viên năm nhất chuyên ngành Công nghệ Kỹ thuật Cơ điện tử tại Đại học Kỹ thuật - Công nghệ Cần Thơ (CTUT). Mình đam mê công nghệ, lập trình hệ thống và chế tạo. Mình luôn tìm kiếm cơ hội để học hỏi và tạo ra những sản phẩm thực tế hữu ích.",
  about_en: "Hello! I am Le Khanh Duy, a freshman majoring in Mechatronics Engineering Technology at Can Tho University of Technology (CTUT). I am passionate about technology, system programming, and manufacturing. I am always looking for opportunities to learn and create useful practical products.",
  goals: "Mục tiêu ngắn hạn: Nắm vững kiến thức đại cương và cơ sở ngành, phát triển kỹ năng lập trình nhúng và web. Mục tiêu dài hạn: Trở thành kỹ sư Cơ điện tử giỏi, tham gia các dự án IoT và tự động hóa chuyên nghiệp.",
  goals_en: "Short-term: Master general and fundamental knowledge, develop embedded and web programming skills. Long-term: Become a skilled Mechatronics engineer, participate in professional IoT and automation projects."
};

export const ABOUT_TABS = [
  {
    id: 'student',
    label: 'Sinh viên',
    label_en: 'Student',
    content: "Hiện là sinh viên năm nhất tại Đại học Kỹ thuật - Công nghệ Cần Thơ (CTUT). Mình đang tập trung xây dựng nền tảng toán học và tư duy lập trình vững chắc.",
    content_en: "Currently a freshman at Can Tho University of Technology (CTUT). I am focusing on building a solid mathematical foundation and programming mindset."
  },
  {
    id: 'tech',
    label: 'Công nghệ',
    label_en: 'Tech',
    content: "Đam mê IoT, Arduino và Web Development. Mình thích việc kết hợp phần cứng và phần mềm để tạo ra các hệ thống thông minh.",
    content_en: "Passionate about IoT, Arduino, and Web Development. I enjoy combining hardware and software to create smart systems."
  },
  {
    id: 'hobbies',
    label: 'Sở thích',
    label_en: 'Hobbies',
    content: "Ngoài coding, mình thích nghe nhạc Lofi, nghiên cứu linh kiện điện tử và đôi khi là chơi game để giải trí.",
    content_en: "Besides coding, I like listening to Lofi music, researching electronic components, and sometimes playing games for entertainment."
  }
];

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: 'iot',
    title: "IoT & Embedded",
    title_en: "IoT & Embedded",
    description: "Lập trình vi điều khiển (ESP32, Arduino), thiết kế mạch và xây dựng hệ thống Smart Home kết nối vạn vật.",
    description_en: "Microcontroller programming (ESP32, Arduino), circuit design, and building IoT Smart Home systems.",
    icon: Wifi,
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: 'web',
    title: "Web Development",
    title_en: "Web Development",
    description: "Xây dựng giao diện web hiện đại (React, Tailwind), tối ưu UX/UI và phát triển Back-end (Node.js) cho các ứng dụng điều khiển.",
    description_en: "Building modern web interfaces (React, Tailwind), optimizing UX/UI, and developing Back-end (Node.js) for control applications.",
    icon: Globe,
    color: "from-violet-500 to-purple-500"
  },
  {
    id: 'automation',
    title: "Automation & AI",
    title_en: "Automation & AI",
    description: "Tự động hóa quy trình với Python, tích hợp Chatbot AI hỗ trợ và xử lý dữ liệu cảm biến thông minh.",
    description_en: "Process automation with Python, integrating AI Chatbots for support and smart sensor data processing.",
    icon: Bot,
    color: "from-orange-400 to-red-500"
  }
];

export const MASCOT_QUOTES = [
  "Chào bạn! Mình là KZ-Bot 🤖",
  "Bạn có muốn nghe chút nhạc không? 🎧",
  "Đừng quên uống nước nhé! 💧",
  "React và Tailwind thật tuyệt! ⚛️",
  "Kéo xuống để xem các dự án của Duy nhé 👇",
  "Cần Thơ gạo trắng nước trong... 🎵",
  "Bug này lạ quá... 🤔",
  "Hãy liên hệ với Duy nếu bạn có ý tưởng hay! 📧"
];

export const SKILLS: Skill[] = [
  { name: "C/C++", level: 70 },
  { name: "Arduino/IoT", level: 65 },
  { name: "HTML/CSS/JS", level: 60 },
  { name: "Node.js", level: 50 },
  { name: "Git/GitHub", level: 55 },
];

export const PROJECTS: Project[] = [
  {
    title: "Profile & CV Cá Nhân",
    title_en: "Personal Profile & CV",
    description: "Website giới thiệu thông tin cá nhân, tích hợp CV điện tử và các tiện ích giải trí. Giao diện hiện đại, responsive.",
    description_en: "Personal information introduction website, integrated digital CV and entertainment utilities. Modern, responsive interface.",
    tags: ["React", "Tailwind CSS", "UI/UX"],
    github: "https://github.com/kzi20007/profile",
    link: "https://kzii.site",
    image: "https://i.postimg.cc/q7w1Kpwq/Chat-GPT-Image-19-34-15-31-thg-1-2026.png"
  },
  {
    title: "Hệ thống Điểm rèn luyện",
    title_en: "Training Point System",
    description: "Hệ thống hỗ trợ chấm điểm rèn luyện và điểm danh cho sinh viên, giúp quản lý thông tin hiệu quả và chính xác.",
    description_en: "System to support training point grading and attendance for students, helping manage information effectively and accurately.",
    tags: ["Web App", "Database", "Management"],
    github: "https://github.com/kzi207",
    link: "https://dd.kzii.site",
    image: "https://i.postimg.cc/x1S5FXFn/Chat-GPT-Image-19-29-54-31-thg-1-2026.png"
  },
  {
    title: "Chatbot Messenger",
    title_en: "Messenger Chatbot",
    description: "Chatbot tự động trả lời tin nhắn trên nền tảng Facebook Messenger, hỗ trợ tương tác và giải đáp thắc mắc cơ bản.",
    description_en: "Chatbot automatically responds to messages on Facebook Messenger platform, supporting basic interaction and Q&A.",
    tags: ["Node.js", "Facebook API", "AI"],
    github: "https://github.com/Kzi207/bot-mess-ts.git",
    image: "https://i.postimg.cc/sD39pkBj/Chat-GPT-Image-19-38-42-31-thg-1-2026.png"
  }
];

export const EDUCATION: Education[] = [
  {
    school: "Đại học Kỹ thuật - Công nghệ Cần Thơ (CTUT)",
    degree: "Kỹ sư Công nghệ Kỹ thuật Cơ điện tử",
    degree_en: "Engineer of Mechatronics Engineering Technology",
    year: "2025 - 2030 (Dự kiến)",
    description: "Sinh viên năm nhất. Tích cực tham gia các hoạt động nghiên cứu và phong trào đoàn hội.",
    description_en: "Freshman. Actively participating in research activities and union movements."
  }
];

export const PLAYLIST: Track[] = [
  { title: "Có Chờ Em", artist: "Tuyển Tập", url: "https://files.catbox.moe/du4vux.mp3" },
  { title: "Phải Chăng Em Đã Yêu", artist: "Tuyển Tập", url: "https://files.catbox.moe/lqtx1o.mp3" },
  { title: "Tình Yêu Màu Hồng", artist: "Tuyển Tập", url: "https://files.catbox.moe/r9g8oj.mp3" },
  { title: "Yêu Em Rất Nhiều", artist: "Tuyển Tập", url: "https://files.catbox.moe/3k1lb2.mp3" },
  { title: "Đông Kiếm Em", artist: "Tuyển Tập", url: "https://files.catbox.moe/moc4n3.mp3" },
  { title: "Anh Đánh Rơi Người Yêu Này", artist: "Tuyển Tập", url: "https://files.catbox.moe/8ivhn1.mp3" },
  { title: "Lặng Yên", artist: "Tuyển Tập", url: "https://files.catbox.moe/xyvzqh.mp3" },
  { title: "Em Là Nhất", artist: "Tuyển Tập", url: "https://files.catbox.moe/cn7kpy.mp3" },
  { title: "Hơn Cả Yêu", artist: "Tuyển Tập", url: "https://files.catbox.moe/121b1e.mp3" },
  { title: "Nàng Thơ", artist: "Tuyển Tập", url: "https://files.catbox.moe/y11k8p.mp3" },
  { title: "Mượn Rượu Tỏ Tình", artist: "Tuyển Tập", url: "https://files.catbox.moe/b2r0ri.mp3" },
  { title: "Vì Yêu Là Nhớ", artist: "Tuyển Tập", url: "https://files.catbox.moe/922tbm.mp3" },
  { title: "Exs Hate Me", artist: "Tuyển Tập", url: "https://files.catbox.moe/kjdp7i.mp3" },
  { title: "Anh Nhà Ở Đâu Thế", artist: "Tuyển Tập", url: "https://files.catbox.moe/lvpg1w.mp3" },
  { title: "Là Do Em Xui Thôi", artist: "Tuyển Tập", url: "https://files.catbox.moe/os0jli.mp3" },
  { title: "Yêu Nhiều Ghen Nhiều", artist: "Tuyển Tập", url: "https://files.catbox.moe/wwfjwo.mp3" },
  { title: "Em Đã Sống Tốt Khi Ở Bên Cạnh Anh Mà", artist: "Tuyển Tập", url: "https://files.catbox.moe/18og25.mp3" },
  { title: "Chia Đôi Con Đường Remix", artist: "Tuyển Tập", url: "https://files.catbox.moe/e3eyf5.mp3" },
  { title: "Cơn Mưa Tình Yêu Remix", artist: "Tuyển Tập", url: "https://files.catbox.moe/909xoq.mp3" },
  { title: "Phép Màu", artist: "Tuyển Tập", url: "https://files.catbox.moe/gcvtkk.mp3" },
  { title: "Ghé Qua", artist: "Tuyển Tập", url: "https://files.catbox.moe/10wi9k.mp3" },
  { title: "Tình Ka (Lofi Ver)", artist: "Tuyển Tập", url: "https://files.catbox.moe/bylg1v.mp3" },
  { title: "Tháng Tư Là Lời Nói Dối Của Em", artist: "Tuyển Tập", url: "https://files.catbox.moe/usvlxk.mp3" },
  { title: "Cưới Thôi", artist: "Tuyển Tập", url: "https://files.catbox.moe/v14ejm.mp3" },
  { title: "2 Phút Hơn", artist: "Tuyển Tập", url: "https://files.catbox.moe/pcfjgj.mp3" },
  { title: "Anh Đã Quen Với Cô Đơn", artist: "Tuyển Tập", url: "https://files.catbox.moe/rctj2u.mp3" },
  { title: "Em Không Sai, Chúng Ta Sai", artist: "Tuyển Tập", url: "https://files.catbox.moe/sliwoq.mp3" },
  { title: "Có Hẹn Với Thanh Xuân", artist: "Tuyển Tập", url: "https://files.catbox.moe/thtjqr.mp3" }
];

export const TIMELINE: TimelineItem[] = []; 

export const LOVE_QUOTES = [
  "Gặp đúng người, muộn cũng hóa sớm.",
  "Yêu đúng người, tự nhiên thấy mọi thứ dịu lại.",
  "Thích một người là chuyện nhỏ, ở lại với họ mới là chuyện lớn.",
  "Không cần hứa mãi mãi, chỉ cần đừng đổi thay.",
  "Yêu nhau không khó, giữ nhau mới khó.",
  "Im lặng là cách đau nhất để nói lời chia tay.",
  "Người từng quan trọng nhất, cũng có thể trở thành người xa lạ nhất.",
  "Thương nhiều quá, đôi khi lại thành thua.",
  "Có những người chỉ nên giữ trong tim, không nên giữ bên đời.",
  "Không phải hết yêu, chỉ là hết được yêu.",
  "Tình yêu không sai, sai là yêu nhầm người.",
  "Buông tay không phải vì hết thương, mà vì quá mệt.",
  "Người ở lại luôn là người thương nhiều hơn.",
  "Cảm xúc thật thì thường thiệt thòi.",
  "Chúng ta từng rất hợp, chỉ là không hợp để đi lâu.",
  "Thương một người không cần lý do, rời xa lại cần rất nhiều lý do.",
  "Tình cảm mà miễn cưỡng thì sớm muộn cũng tan.",
  "Càng cố giữ, đôi khi càng đau.",
  "Yêu là nghĩ cho nhau, không phải giữ cho riêng mình.",
  "Người làm mình cười nhiều nhất cũng có thể làm mình đau nhất.",
  "Khoảng cách lớn nhất là khi còn yêu nhưng không thể ở bên.",
  "Không ai vô tâm, chỉ là không đủ quan tâm.",
  "Có những lời hứa sinh ra chỉ để bị quên.",
  "Thích thì dễ, thương mới khó, giữ được lại càng khó.",
  "Yêu một người không cần cả thế giới biết.",
  "Điều ta cần không phải là lời nói, mà là hành động.",
  "Người cũ không xấu, chỉ là không còn hợp.",
  "Tình yêu trưởng thành là không làm đau nhau thêm nữa.",
  "Có những chuyện nhắc lại chỉ thêm buồn.",
  "Hết lòng rồi thì không hối hận.",
  "Thương đúng người là bình yên.",
  "Thương sai người là bài học.",
  "Yêu không cần hoàn hảo, chỉ cần chân thành.",
  "Đôi khi mất nhau là cách để cả hai trưởng thành.",
  "Có những người đến chỉ để dạy ta cách buông.",
  "Không phải ai im lặng cũng là ổn.",
  "Tình cảm nhạt đi không phải vì thời gian.",
  "Yêu xa nhất là yêu trong im lặng.",
  "Người quan trọng nhất là người không làm mình phải suy nghĩ.",
  "Cảm giác an toàn quý hơn lời hứa.",
  "Yêu là khi muốn ở lại, không phải bị giữ lại.",
  "Có những mối quan hệ dừng đúng lúc là tốt nhất.",
  "Thương ai đó quá nhiều, dễ quên mất bản thân.",
  "Không phải ai đến cũng là để ở lại.",
  "Yêu mà phải lo sợ thì không còn là yêu.",
  "Người khiến mình bình yên mới là người nên ở bên.",
  "Có những nỗi buồn không cần nói ra.",
  "Thời gian không chữa lành, chỉ giúp quen dần.",
  "Yêu một người là chấp nhận cả những điều chưa hoàn hảo.",
  "Đôi khi xa nhau lại là cách nhớ nhau lâu hơn.",
  "Không cần yêu ồn ào, chỉ cần yêu lâu.",
  "Người hiểu mình còn quan trọng hơn người yêu mình.",
  "Thương nhau đừng để nhau phải lựa chọn.",
  "Có những mối quan hệ chết dần trong im lặng.",
  "Yêu đúng người, mọi thứ đều đơn giản.",
  "Yêu sai người, chuyện nhỏ cũng thành mệt mỏi.",
  "Không phải ai ở bên lâu cũng là thương.",
  "Cũng không phải ai rời đi cũng là hết thương.",
  "Tình yêu đẹp nhất là khi được là chính mình.",
  "Có những người chỉ cần nhớ, không cần gặp.",
  "Yêu là khi nghĩ cho tương lai, không chỉ hiện tại.",
  "Im lặng đôi khi là lời từ chối nhẹ nhàng nhất.",
  "Thương một người không cần phải nói nhiều.",
  "Ở bên nhau mà vẫn cô đơn mới là buồn nhất.",
  "Không phải lúc nào cố gắng cũng được đáp lại.",
  "Tình cảm thật không cần phô trương.",
  "Người làm mình an tâm mới là người đáng giữ.",
  "Yêu không phải là chiếm hữu.",
  "Yêu là để cả hai tốt hơn.",
  "Có những người chỉ đi cùng mình một đoạn.",
  "Đủ thương thì sẽ tìm cách ở lại.",
  "Không đủ thương thì lý do sẽ rất nhiều.",
  "Tình yêu không cần hoàn cảnh hoàn hảo.",
  "Chỉ cần hai người đủ kiên nhẫn.",
  "Có những cuộc chia tay không có lời tạm biệt.",
  "Yêu lâu không đáng sợ, yêu mà mệt mới đáng sợ.",
  "Người ở lại sau cùng mới là người quan trọng.",
  "Đôi khi yêu ít lại, sẽ đau ít hơn.",
  "Thương nhau đừng để nhau phải đoán.",
  "Tình yêu cần sự rõ ràng.",
  "Mập mờ là cách làm tổn thương nhanh nhất.",
  "Có những nỗi buồn chỉ lớn lên theo năm tháng.",
  "Yêu là khi thấy người đó cười, mình cũng vui.",
  "Buông đúng lúc là tự thương lấy mình.",
  "Không phải mất nhau là mất tất cả.",
  "Sau tất cả, bình yên vẫn là quan trọng nhất."
];
