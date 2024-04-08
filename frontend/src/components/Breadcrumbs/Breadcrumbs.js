import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs();

    return (
        <nav aria-label="breadcrumb" className="pt-lg-2">
            <ol className="breadcrumb">
                {breadcrumbs.map(({ breadcrumb }) => {
                    return (
                        <li className="breadcrumb-item">
                            <Link>{breadcrumb}</Link>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
