import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilterApi} from "../../redux/actions/filterAction";

import {CheckboxFilter} from "./CheckboxFilter";
import {ColorFilter} from "./ColorFilter";
import {SizeButtonFilter} from "./SizeButtonFilter";
import {postFilterRequest} from "../../redux/actions/productActions";
import './FilterContainer.scss'

import './FilterContainer.scss'

const SuggestionsBar = () => {
    const dispatch = useDispatch()

    

    return (
        <div className='filterContainer'>
            <div className='filterWhatsNewContainer'>
                <div
                    className='filterWhatsNew'>AI Search</div>
            </div>
        </div>
    )
}


export default SuggestionsBar