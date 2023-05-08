import Pagination from 'react-bootstrap/Pagination';

export default function MyPagination({ total, current, onChangePage }) {
    // let active = 2;
    let items = [];
    // if (current > 1) {
    //     items.push(<Pagination.Prev key="prev" onClick={() => onChangePage(current - 1)} />)
    // }

    for (let page = 1; page <= total; page++) {
        items.push(
            <Pagination.Item key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)} >
                {page}
            </Pagination.Item>
        );
    }

    // for (let number = 1; number <= 5; number++) {
    //     items.push(
    //         <Pagination.Item key={number}>
    //             {number}
    //         </Pagination.Item>,
    //     );
    // }
    // if (current < total) {
    //     items.push(<Pagination.Next key="next" onClick={() => onChangePage(current + 1)} />)
    // }
    const paginationBasic = (
        <div>
            <Pagination>{items}</Pagination>
            <br />
        </div>
    );

    return (paginationBasic);
}
