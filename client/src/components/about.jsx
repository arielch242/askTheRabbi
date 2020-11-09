import React,{Component} from 'react';
import PageHeader from './common/pageHeader';

class About extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container min-vh-100 bg-img text-white text-right">
                <PageHeader titleText="אודות"/>
                <br/>
                <h5 >
                מפעילות "לשכת הגזית " אנו מפעילים בית הוראה ארצי ייחודי הבא לתת מענה לכלל לומדי התורה ועמך ישראל אשר מעוניינים לברר סוגיות הלכתיות אקטואליות או לדעת את הדרך אשר ילכו בה דרך ההלכה, דרך התורה
                </h5><br/><h5>
בבית הוראה חברים חשובי הרבנים ומורי הוראה  ממגוון הקהילות והעדות מכל רחבי הארץ, יושבים ועונים לשאלות החל מ-8:00 בבוקר עד 24:00 בערב
</h5><br/><h5>
לכל שאלה בכל תחומי ההלכה יש מענה מיידי, כל איש או אשה שמסתפקים באיזו הלכה, מוזמנים לפנות לבית ההוראה לקבל מענה מיידי בהתנדבות ורוח טובה
                </h5>
            </div>
         );
    }
}
 
export default About;
