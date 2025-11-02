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


export const assets = {book1, book2, book3, book4, book5, book6, book7, book8, book9, profilePic, coverImg,Astronaut,Fiction,History,Non_Fiction,Poetry,Thrill,logo,bookMain}

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
        image:History
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
        image: book1,
        category: 'Fiction',
        author: 'Rebecca Ross',
        des: 'A magical tale about vengeance and secrets under the surface.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'

    },
    {
        _id: 'b2',
        name: 'The Dragon’s Promise',
        image: book9,
        category: 'Fantasy',
        author: 'Elizabeth Lim',
        des: 'A journey through kingdoms and mythical lands to fulfill a vow.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b3',
        name: 'Packing for Mars',
        image: book3,
        category: 'Science',
        author: 'Mary Roach',
        des: 'Funny, strange, and informative stories about space travel.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b4',
        name: 'A People’s History',
        image: book4,
        category: 'History',
        author: 'Howard Zinn',
        des: 'A bold retelling of American history from the bottom up.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b5',
        name: 'The Silent Patient',
        image: book5,
        category: 'Thriller',
        author: 'Alex Michaelides',
        des: 'A woman’s shocking act of violence and the therapist obsessed with uncovering her motive.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b6',
        name: 'Verity',
        image: book6,
        category: 'Thriller',
        author: 'Colleen Hoover',
        des: 'A chilling psychological suspense filled with twists.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b7',
        name: 'Atomic Habits',
        image: book7,
        category: 'Self-Help',
        author: 'James Clear',
        des: 'An easy and proven way to build good habits and break bad ones.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b8',
        name: 'Milk and Honey',
        image: book4,
        category: 'Poetry',
        author: 'Rupi Kaur',
        des: 'A collection of poetry about love, loss, trauma, and healing.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b9',
        name: 'The Sun and Her Flowers',
        image: book9,
        category: 'Poetry',
        author: 'Rupi Kaur',
        des: 'A vibrant and transcendent journey about growth and self-love.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b10',
        name: 'Pride and Prejudice',
        image: book1,
        category: 'Romance',
        author: 'Jane Austen',
        des: 'A classic love story between Elizabeth Bennet and Mr. Darcy.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b11',
        name: 'The Notebook',
        image: book2,
        category: 'Romance',
        author: 'Nicholas Sparks',
        des: 'A timeless romance that touches the heart.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b12',
        name: 'Sapiens: A Brief History of Humankind',
        image: book3,
        category: 'Non-Fiction',
        author: 'Yuval Noah Harari',
        des: 'An insightful look at the evolution of human beings.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b13',
        name: 'Educated',
        image: book4,
        category: 'Biography',
        author: 'Tara Westover',
        des: 'A powerful memoir about a woman who escapes her survivalist family.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b14',
        name: 'Becoming',
        image: book5,
        category: 'Biography',
        author: 'Michelle Obama',
        des: 'An intimate, powerful, and inspiring memoir.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b15',
        name: 'The Martian',
        image:book6,
        category: 'Science Fiction',
        author: 'Andy Weir',
        des: 'A stranded astronaut’s gripping fight for survival on Mars.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b16',
        name: 'Dune',
        image: book7,
        category: 'Science Fiction',
        author: 'Frank Herbert',
        des: 'A science fiction masterpiece set on the desert planet Arrakis.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b17',
        name: 'The Book Thief',
        image: book2,
        category: 'Historical Fiction',
        author: 'Markus Zusak',
        des: 'A story set in Nazi Germany told through the eyes of a book-loving girl.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b18',
        name: 'All the Light We Cannot See',
        image: book9,
        category: 'Historical Fiction',
        author: 'Anthony Doerr',
        des: 'A tale of two teenagers during World War II.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b19',
        name: 'The Subtle Art of Not Giving a F*ck',
        image: book1,
        category: 'Self-Help',
        author: 'Mark Manson',
        des: 'A brutally honest self-help guide that cuts through the clichés.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    },
    {
        _id: 'b20',
        name: '1984',
        image: book2,
        category: 'Fiction',
        author: 'George Orwell',
        des: 'A dystopian novel about surveillance, control, and loss of freedom.',
        publication_Date :'May 15, 2022',
        ISBN:'978-1-2345-6789-0',
        availability:'Available'
    }
];
