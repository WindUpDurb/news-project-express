let quotes = [
    ["Truth is stranger than fiction, but it is because Fiction is obliged to stick to possibilities; Truth isn’t.", "Mark Twain"],
    ["Maybe ever’body in the whole damn world is scared of each other.", "John Steinbeck"],
    ["It was a bright cold day in April, and the clocks were striking thirteen.", "George Orwell"],
    ["We were the people who were not in the papers. We lived in the blank white spaces at the edges of print. It gave us more freedom. We lived in the gaps between the stories.", "Margaret Atwood"],
    ["Nothing is so painful to the human mind as a great and sudden change.", "Mary Shelley"],
    ["So, we beat on, boats against the current, borne back ceaselessly into the past", "F. Scott Fitzgerald"],
    ["The mind is its own place, and in itself can make a heaven of hell, a hell of heaven", "John Milton"],
    ["Not all those who wander are lost.", "J.R.R. Tolkien"],
    ["Fact may not be truth, and truth may not be factual.", "Haruki Murakami"]
];

export const grabQuote = () => {

    return quotes[Math.floor(Math.random() * quotes.length)];
};