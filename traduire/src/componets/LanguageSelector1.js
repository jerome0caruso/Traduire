import { Form } from 'react-bootstrap';
import '../App.css';
const LanguageSelector1 = ({ handleLanguage1 }) => {

    return (
        <div className="lSelector">
            <Form.Select aria-label="Default select example" onChange={(e) => handleLanguage1(e)}>
                <option>Languages</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="it">Italian</option>
                <option value="de">German</option>
                <option value="ar">Arabic</option>
                <option value="bn">Bengali</option>
                <option value="bs">Bosnian</option>
                <option value="bg">Bulgarian</option>
                <option value="zh-TW">Chinese</option>
                <option value="hr">Croatian</option>
                <option value="cs">Czech</option>
                <option value="nl">Danish</option>
                <option value="en">Dutch</option>
                <option value="et">Estonian</option>
                <option value="fi">Finnish</option>
                <option value="fr">Greek</option>
                <option value="gu">Gujarati</option>
                <option value="he">Hebrew</option>
                <option value="hi">Hindi</option>
                <option value="hu">Hungarian</option>
                <option value="ga">Irish</option>
                <option value="id">Indonesian</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="lv">Latvian</option>
                <option value="lt">Lithuanian</option>
                <option value="ms">Malay</option>
                <option value="ml">Malayalam</option>
                <option value="mt">Maltese</option>
                <option value="ne">Nepali</option>
                <option value="nb">Norwegian</option>
                <option value="pl">Polish</option>
                <option value="pt">Portuguese</option>
                <option value="ro">Romanian</option>
                <option value="ru">Russian</option>
                <option value="sr">Serbian</option>
                <option value="si">Sinhala</option>
                <option value="es">Spanish</option>
                <option value="sk">Slovak</option>
                <option value="sl">Slovenian</option>
                <option value="sv">Swedish</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
                <option value="th">Thai</option>
                <option value="tr">Turkish</option>
                <option value="uk">Ukrainian</option>
                <option value="ur">Urdu</option>
                <option value="vi">Vietnamese</option>
                <option value="cy">Welsh</option>
            </Form.Select>
        </div>
    )
}

export default LanguageSelector1;