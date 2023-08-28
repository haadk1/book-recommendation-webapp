import Book from "../book/bookAtom"

export default function Row(props) {
    if (props.data == undefined) return;
    return (
        props.data.map((data, i) => {
            let volumeInfo = data.volumeInfo;
            let name = volumeInfo.title;
            let description = volumeInfo.description
            let coverId = volumeInfo.imageLinks !== undefined ? volumeInfo.imageLinks.thumbnail : "http://books.google.com/books/content?id=Lv1DAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
            let authors = volumeInfo.authors;
            return <Book isExplore={props.isExplore} data={data} description={description} name={name} coverId={coverId} key={i} authors={authors} uid={props.uid} auth={props.auth}></Book>
        })
    )

}