import { Pagination } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({ numberOfPage, totalProducts, currentPage = 1 }) => {
    const [searchParams] = useSearchParams();
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    
    // Use currentPage from props if available, otherwise fall back to URL params
    const page = currentPage || (searchParams.get("page") ? Number(searchParams.get("page")) : 1);

    const onChangeHandler = (event, value) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", value.toString());
        
        // Also set pageSize if not already set to ensure consistent pagination
        if (!params.has('pageSize')) {
            params.set('pageSize', '12');
        }
        
        navigate(`${pathname}?${params.toString()}`);
        
        // Scroll to top after page change for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <Pagination 
                page={page}
                count={numberOfPage || 1}
                siblingCount={1}
                boundaryCount={1}
                shape="rounded"
                onChange={onChangeHandler}
                color="primary"
                showFirstButton
                showLastButton
            />
            {totalProducts && (
                <p className="text-sm text-gray-600">
                    Showing {(page - 1) * parseInt(searchParams.get('pageSize') || '12') + 1} to {Math.min(page * parseInt(searchParams.get('pageSize') || '12'), totalProducts)} of {totalProducts} products
                </p>
            )}
        </div>
    );
};

export default Paginations;