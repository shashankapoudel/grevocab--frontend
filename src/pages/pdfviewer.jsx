import QuantPdfViewer from "./Quantpdfviewer"
import VocabPdfViewer from "./vocabpdfviewer"

const PdfViewer = () => {
    return (
        <div className="flex flex-col gap-0">
            <VocabPdfViewer />
            <QuantPdfViewer />
        </div>
    )
}
export default PdfViewer