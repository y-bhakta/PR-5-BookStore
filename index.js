import express from "express"
import dotenv from "dotenv"
import { db } from "./configs/db.js"
import { Books } from "./models/usermodle.js"
import bodyParser from "body-parser"
dotenv.config();
const port = process.env.PORT || 8082;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.render("./index");
});
app.get('/form-basic', (req, res) => {
    res.render("./pages/form-basic");
});
app.get('/tables', async (req, res) => {
    try {
        let data = await Books.find({});
        res.render("./pages/tables", { books: data });
    } catch (error) {
        console.log(error);
        // Render tables with an empty books array on error to avoid template failures
        return res.render("./pages/tables", { books: [] });
    }
});
app.post("/create/book", async (req, res) => {
    try {
        let book = new Books(req.body);
        await book.save();
        return res.redirect('/tables');
    } catch (error) {
        console.log(error);
        return res.redirect('/form-basic');
    }
});
app.post("/edit/book/:id", async (req, res) => {
    try {
        const book = await Books.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) { 
            return res.status(404).send("Book not found");
        }else{
            console.log('Book updated:', book);
        }
        return res.redirect('/tables'); // Redirect to the view page after editing
    } catch (error) {
        console.log('Error updating book:', error);
        return res.status(500).send("Error updating book");
    }
});
app.get('/book/delete/:id', (req, res) => {
    const { id } = req.params;
    Books.findByIdAndDelete(id)
        .then((data) => {
            return res.redirect('/tables');
        })
        .catch((err) => {
            return res.json({ message: err.message });
        })
});
app.get('/book/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let allbooks = await Books.find({});
        return res.render('./pages/editbook', { ID: id, books: allbooks });
    } catch (error) {
        return res.json({ message: error.message });       
    }
});
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server Stared At port http://127.0.0.1:" + port);
});