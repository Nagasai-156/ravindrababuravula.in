// Social proof notification data — names + courses

const FIRST_NAMES = [
  "Aarav","Aadhya","Aakash","Aarush","Aanya","Abhinav","Abhishek","Aditi","Aditya","Ajay",
  "Akash","Akhil","Akshay","Amita","Amit","Amulya","Anand","Aniket","Anil","Anisha",
  "Anjali","Ankit","Ankita","Anmol","Anuj","Anusha","Apoorva","Arjun","Arnav","Arun",
  "Aryan","Ashish","Ashwin","Ayaan","Ayush","Bharat","Bhavya","Chaitanya","Chandan","Chandni",
  "Chirag","Daksh","Darshan","Deepak","Deepika","Dev","Devika","Dhanush","Dhruv","Diksha",
  "Dinesh","Divya","Esha","Farhan","Gaurav","Gautam","Geeta","Govind","Gulshan","Harsh",
  "Harsha","Harshit","Himanshu","Hritik","Ishaan","Ishita","Jatin","Jay","Jaya","Jayesh",
  "Jitesh","Jyoti","Kabir","Kajal","Karan","Kartik","Kavita","Kavya","Khushi","Kiran",
  "Kirti","Komal","Krishna","Kunal","Lakshmi","Lavanya","Lokesh","Madhav","Mahesh","Manoj",
  "Mansi","Mayank","Meera","Megha","Mohan","Mohit","Monal","Mukesh","Muskan","Naman",
  "Nandini","Naresh","Naveen","Neeraj","Neha","Nikhil","Nikita","Nipun","Nisha","Nitesh",
  "Nitin","Om","Pallavi","Pankaj","Paresh","Parth","Parul","Pooja","Prabhat","Prachi",
  "Pradeep","Prakash","Pranav","Pranjal","Prasad","Prateek","Pratham","Pratik","Pratyush","Preeti",
  "Priya","Priyanka","Punit","Rahul","Raj","Rajat","Rajesh","Rakesh","Ram","Ramesh",
  "Ranbir","Ranjit","Rashmi","Ravi","Ravindra","Reema","Ritesh","Ritika","Rohit","Roshan",
  "Sachin","Sahil","Sakshi","Sameer","Sandeep","Sandip","Sanjay","Sanjana","Sanket","Sapna",
  "Sarika","Sarthak","Satish","Saurabh","Savita","Shailesh","Shakti","Shalini","Shantanu","Shashank",
  "Shikha","Shiv","Shivam","Shivani","Shreya","Shruti","Shubham","Shweta","Siddharth","Simran",
  "Sneha","Soham","Sonal","Sonali","Sourabh","Srikanth","Srinivas","Subhash","Sudhir","Sumit",
  "Sundar","Sunil","Suresh","Surya","Swapnil","Swati","Tanmay","Tanvi","Tarun","Tejas",
  "Tushar","Uma","Umesh","Utkarsh","Vaibhav","Vaishnavi","Varun","Vedant","Vijay","Vikas",
  "Vinay","Vineet","Vinod","Vipul","Vishal","Vivek","Yash","Yashika","Yogesh","Yukti",
  "Zara","Aarushi","Abhi","Achyut","Adesh","Agastya","Ajit","Alok","Amrit","Ananya",
  "Anirudh","Ankur","Aparna","Arpit","Ashok","Avni","Ayesha","Bhanu","Bhavesh","Bhuvan",
  "Bindu","Chaitra","Charvi","Darpan","Devansh","Dhara","Dheeraj","Dolly","Ekta","Ganesh",
  "Garima","Girish","Gopi","Gunjan","Hema","Isha","Ishan","Jagdish","Janaki","Jayant",
  "Jhanvi","Juhi","Kamala","Kanika","Kapil","Keshav","Kishore","Kriti","Lata","Madhu",
  "Malini","Manish","Meghna","Mithun","Murali","Nagesh","Nalini","Navya","Neelam","Nidhi",
  "Nilesh","Nirmala","Padma","Parvati","Pihu","Pragya","Prem","Priyanshi","Pushpa","Radhika",
  "Raghu","Rani","Rekha","Riddhi","Ritu","Rupal","Saanvi","Samir","Saroj","Seema",
  "Shankar","Sharda","Shrey","Siddhi","Smita","Sohan","Sriram","Subha","Sudha","Suman",
  "Sunita","Supriya","Tanya","Trilok","Uday","Ujjwal","Vansh","Varsha","Veena","Vidya",
  "Vinita","Yamini","Yuvraj","Aishwarya","Bhoomika","Chandrashekar","Disha","Gaurang","Hemant","Indira",
  "Jagruti","Kedar","Lavish","Mitali","Navneet","Omkar","Palak","Ramya","Satyam","Tanisha",
  "Unnati","Vani","Wasim","Yatin","Zubin","Alka","Bhargav","Chitra","Devendra","Eknath",
  "Fatima","Girija","Hitesh","Ila","Jagat","Kamini","Lalit","Maitri","Neev","Ojas",
];

const COURSES = [
  "GATE CS Core 2027",
  "GATE CS Core 2028",
  "GATE CS Core 2029",
  "GATE CS Core Plus 2027",
  "GATE CS Core Plus 2028",
  "GATE CS Core Plus 2029",
  "GATE DA Core 2027",
  "GATE DA Core 2028",
  "GATE DA Core 2029",
  "GATE DA Core Plus (MP) 2027",
  "GATE DA Core Plus (MP) 2028",
  "GATE DA Core Plus (MP) 2029",
  "UGC NET Dec 2026",
  "UGC NET June 2027",
  "DSA with Java + Leetcode Problems",
];

function getColor(name) {
  const colors = [
    "#e74c3c","#3498db","#2ecc71","#9b59b6","#f39c12",
    "#1abc9c","#e67e22","#8e44ad","#16a085","#c0392b",
    "#2980b9","#27ae60","#d35400","#7f8c8d","#2c3e50",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function getRandomEnrollment() {
  const name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const course = COURSES[Math.floor(Math.random() * COURSES.length)];
  const mins = Math.floor(Math.random() * 45) + 2;
  return {
    name,
    course,
    time: `${mins} minutes ago`,
    color: getColor(name),
  };
}

export default { getRandomEnrollment };
