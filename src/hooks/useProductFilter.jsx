import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../store/actions/index.js';
import { useSelector } from 'react-redux';
import { dashboardProductsAction } from '../store/actions/index.js';

const useProductFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        // Ensure page parameter exists with default value
        const params = new URLSearchParams(searchParams);
        
        if (!params.has('page')) {
            params.set('page', '1');
        }
        
        if (!params.has('pageSize')) {
            params.set('pageSize', '12');
        }
        
        const queryString = params.toString();
        console.log("Fetching products with query:", queryString);
        dispatch(fetchProducts(queryString));
    }, [searchParams, dispatch]);
};

export const useDashboardProductFilter = () => {

    const { user } = useSelector((state) => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;

        params.set("pageNumber", currentPage - 1);

        const queryString = params.toString();
        dispatch(dashboardProductsAction(queryString, isAdmin));

    }, [dispatch, searchParams]);
};

export default useProductFilter;

