import _ from 'lodash';

export default (el) => {
    return (
        <li className="nav-item w-100" key={_.uniqueId()}>
            <button type="button" className="w-100 rounded-0 text-start btn btn-secondary"><span className="me-1">#</span>{el}</button>
        </li>
    )
}