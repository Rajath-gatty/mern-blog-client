import React from "react";
import { Skeleton } from "@material-ui/lab";

const SkeletonComp = (props) => {
    return (
        <div className="search-skeleton">
            <Skeleton variant="rect" width={100} height={80} />
            <div className="skeleton-title">
                <Skeleton
                    variant="rect"
                    width="100%"
                    style={{ marginTop: 10 }}
                    height={10}
                />
                <Skeleton
                    variant="rect"
                    width={200}
                    style={{ marginTop: 10 }}
                    height={10}
                />
            </div>
        </div>
    );
};

export default SkeletonComp;
