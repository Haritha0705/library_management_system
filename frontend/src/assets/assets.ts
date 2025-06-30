import book1 from "./dreams-lie-beneath-by-rebecca-ross.webp"
import book2 from "./images.jpeg"
import book3 from "./ocean door.jpg"
import book4 from "./whenlifegivesyoumangos.webp"
import book5 from "./MIBLART.jpg"
import book6 from "./blackdreage.jpg"
import book7 from "./Breath-of-the-Dragon.jpg"
import book8 from "./forest.jpeg"
import book9 from "./harrry.jpg"
import Astronaut from "./Astronaut icon.svg"
import Fiction from "./Fiction icon.svg"
import History from "./history icon.svg"
import Non_Fiction from "./Non Fiction icon.svg"
import Thrill from "./Thrill icon.svg"
import Poetry from "./Poetry icon.svg"
import profilePic from "./profileImg.png"
import coverImg from "./mainCover.jpg"
import logo from "./Combo shape.svg"
import bookMain from "./img.png"
import bookWithGirl from "./img-girl.png"


export const assets = {book1, book2, book3, book4, book5, book6, book7, book8, book9, profilePic, coverImg,Astronaut,Fiction,History,Non_Fiction,Poetry,Thrill,logo,bookMain,bookWithGirl}

export const CategoryData = [
    {
        category:'Fiction',
        image:Fiction
    },
    {
        category:'Non-fiction',
        image:Non_Fiction
    },
    {
        category:'Astronaut',
        image:Astronaut
    },
    {
        category:'History',
        image:history
    },
    {
        category:'Thrill',
        image:Thrill
    },
    {
        category:'Poetry',
        image:Poetry
    }
]

export const books = [
    {
        _id: 'b1',
        name: 'Dreams Lie Beneath',
        image: 'https://m.media-amazon.com/images/I/81P59xfsJrL._SL1500_.jpg',
        category: 'Fiction',
        author: 'Rebecca Ross',
        des: 'A magical tale about vengeance and secrets under the surface.',
        price: 50,
    },
    {
        _id: 'b2',
        name: 'The Dragon’s Promise',
        image: 'https://m.media-amazon.com/images/I/91FdyR5pGyL._SL1500_.jpg',
        category: 'Fantasy',
        author: 'Elizabeth Lim',
        des: 'A journey through kingdoms and mythical lands to fulfill a vow.',
        price: 50,
    },
    {
        _id: 'b3',
        name: 'Packing for Mars',
        image: 'https://m.media-amazon.com/images/I/71-L-pCxQOL._SL1200_.jpg',
        category: 'Science',
        author: 'Mary Roach',
        des: 'Funny, strange, and informative stories about space travel.',
        price: 50,
    },
    {
        _id: 'b4',
        name: 'A People’s History of the United States',
        image: 'https://m.media-amazon.com/images/I/81qjZ8oAp7L._SL1500_.jpg',
        category: 'History',
        author: 'Howard Zinn',
        des: 'A bold retelling of American history from the bottom up.',
        price: 50,
    },
    {
        _id: 'b5',
        name: 'The Silent Patient',
        image: 'https://m.media-amazon.com/images/I/71RpsEp2JIL._SL1500_.jpg',
        category: 'Thriller',
        author: 'Alex Michaelides',
        des: 'A woman’s shocking act of violence and the therapist obsessed with uncovering her motive.',
        price: 50,
    },
    {
        _id: 'b6',
        name: 'Verity',
        image: 'https://m.media-amazon.com/images/I/81M7VQ8GNGL._SL1500_.jpg',
        category: 'Thriller',
        author: 'Colleen Hoover',
        des: 'A chilling psychological suspense filled with twists.',
        price: 50,
    },
    {
        _id: 'b7',
        name: 'Atomic Habits',
        image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._SL1500_.jpg',
        category: 'Self-Help',
        author: 'James Clear',
        des: 'An easy and proven way to build good habits and break bad ones.',
        price: 50,
    },
    {
        _id: 'b8',
        name: 'Milk and Honey',
        image: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L._SL1500_.jpg',
        category: 'Poetry',
        author: 'Rupi Kaur',
        des: 'A collection of poetry about love, loss, trauma, and healing.',
        price: 50,
    },
    {
        _id: 'b9',
        name: 'The Sun and Her Flowers',
        image: 'https://m.media-amazon.com/images/I/71XtDks1HML._SL1500_.jpg',
        category: 'Poetry',
        author: 'Rupi Kaur',
        des: 'A vibrant and transcendent journey about growth and self-love.',
        price: 50,
    },
    {
        _id: 'b10',
        name: 'Pride and Prejudice',
        image: 'https://m.media-amazon.com/images/I/91HHqVTAJQL._SL1500_.jpg',
        category: 'Romance',
        author: 'Jane Austen',
        des: 'A classic love story between Elizabeth Bennet and Mr. Darcy.',
        price: 50,
    },
    {
        _id: 'b11',
        name: 'The Notebook',
        image: 'https://m.media-amazon.com/images/I/81ozPB+U7KL._SL1500_.jpg',
        category: 'Romance',
        author: 'Nicholas Sparks',
        des: 'A timeless romance that touches the heart.',
        price: 50,
    },
    {
        _id: 'b12',
        name: 'Sapiens: A Brief History of Humankind',
        image: 'https://m.media-amazon.com/images/I/713jIoMO3UL._SL1200_.jpg',
        category: 'Non-Fiction',
        author: 'Yuval Noah Harari',
        des: 'An insightful look at the evolution of human beings.',
        price: 50,
    },
    {
        _id: 'b13',
        name: 'Educated',
        image: 'https://m.media-amazon.com/images/I/81WojUxbbFL._SL1500_.jpg',
        category: 'Biography',
        author: 'Tara Westover',
        des: 'A powerful memoir about a woman who escapes her survivalist family.',
        price: 50,
    },
    {
        _id: 'b14',
        name: 'Becoming',
        image: 'https://m.media-amazon.com/images/I/81h2gWPTYJL._SL1500_.jpg',
        category: 'Biography',
        author: 'Michelle Obama',
        des: 'An intimate, powerful, and inspiring memoir.',
        price: 50,
    },
    {
        _id: 'b15',
        name: 'The Martian',
        image: 'https://m.media-amazon.com/images/I/81LBkTjKoaL._SL1500_.jpg',
        category: 'Science Fiction',
        author: 'Andy Weir',
        des: 'A stranded astronaut’s gripping fight for survival on Mars.',
        price: 50,
    },
    {
        _id: 'b16',
        name: 'Dune',
        image: 'https://m.media-amazon.com/images/I/91N3lD++S3L._SL1500_.jpg',
        category: 'Science Fiction',
        author: 'Frank Herbert',
        des: 'A science fiction masterpiece set on the desert planet Arrakis.',
        price: 50,
    },
    {
        _id: 'b17',
        name: 'The Book Thief',
        image: 'https://m.media-amazon.com/images/I/81MZpJ+c7qL._SL1500_.jpg',
        category: 'Historical Fiction',
        author: 'Markus Zusak',
        des: 'A story set in Nazi Germany told through the eyes of a book-loving girl.',
        price: 50,
    },
    {
        _id: 'b18',
        name: 'All the Light We Cannot See',
        image: 'https://m.media-amazon.com/images/I/91-Tv8AaDSL._SL1500_.jpg',
        category: 'Historical Fiction',
        author: 'Anthony Doerr',
        des: 'A tale of two teenagers during World War II.',
        price: 50,
    },
    {
        _id: 'b19',
        name: 'The Subtle Art of Not Giving a F*ck',
        image: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SL1500_.jpg',
        category: 'Self-Help',
        author: 'Mark Manson',
        des: 'A brutally honest self-help guide that cuts through the clichés.',
        price: 50,
    },
    {
        _id: 'b20',
        name: '1984',
        image: 'https://m.media-amazon.com/images/I/71kxa1-0mfL._SL1500_.jpg',
        category: 'Fiction',
        author: 'George Orwell',
        des: 'A dystopian novel about surveillance, control, and loss of freedom.',
        price: 50,
    }
]