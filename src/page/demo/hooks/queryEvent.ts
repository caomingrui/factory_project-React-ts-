import {useStore} from "../../../store/vueStore/store";
import {Store} from "../../../store/vueStore";

export const useQueryEvent = () => {

    const data = useStore((store: Store) => {
        const { tabelData, checkTabelData } = store.state;
        return {
            tabelData,
            checkTabelData
        }
    });

    // 处理多列
    function multipleCol<T> (resInd: any, index: number, da: any, i: number = 0) {
        data.tabelData.map((res: typeof data.tabelData) => {
            if (res.key === resInd.key) {

                Object.keys(res).map(list => {
                    if (i == 0) {
                        console.log('11111111111111111111111111111')
                        if (index == 0) {
                            da[list] = res[list];
                            da['ind0'] = 1;
                            da[list + 1] = "";
                            da[list + 2] = "";
                            da['ind' + 1] = "";
                            da['ind' + 2] = "";
                        }

                        if (index == 1) {
                            da[list + '1'] = res[list];
                            da['ind1'] = 2;
                            da[list + 2] = "";
                            da['ind' + 2] = "";
                        }

                        if (index == 2) {
                            da[list + '2'] = res[list];
                            da['ind2'] = 3;
                        }
                    }
                    if ( i != 0) {
                        if (index > 2) {
                            console.log('222222222222222222222222222222222')
                            if (index%3 == 0) {
                                da[list] = res[list];
                                da['ind0'] = 1;
                                da['ind1'] = "";
                                da['ind2'] = "";
                                da[list + 1] = "";
                                da[list + 2] = "";
                            }

                            if (index%3 == 1) {
                                da[list + 1] = res[list];
                                da['ind1'] = 2;
                                da[list + 2] = "";
                                da['ind2'] = "";
                            }

                            if (index%3 == 2) {
                                da[list + 2] = res[list];
                                da['ind2'] = 3;
                            }
                        }
                    }
                });
            }
        });
        return da;
    }


    // 处理waterproof
    function dealWithWater<T> (resInd: any, index: number, da: any, i: number = 0) {
        data.tabelData.map((res: typeof data.tabelData) => {
            if (res.key == resInd.key) {
                console.log(res);
                Object.keys(res).map(list => {

                    if (i == 0) {
                        console.log('11111111111111111111111111111')
                        if (index == 0) {
                            da[list] = res[list];
                            da["batch"] = resInd.batch;
                            da['ind0'] = 1;
                            da[list + 1] = "";
                            da[list + 2] = "";
                            da['ind' + 1] = "";
                            da['ind' + 2] = "";

                        }

                        if (index == 1) {
                            da[list + '1'] = res[list];
                            da['ind1'] = 2;
                            da[list + 2] = "";
                            da['ind' + 2] = "";
                            da["batch1"] = resInd.batch;

                        }

                        if (index == 2) {
                            da[list + '2'] = res[list];
                            da['ind2'] = 3;
                        }
                    }
                    if ( i != 0) {
                        if (index > 2) {
                            console.log('222222222222222222222222222222222')
                            if (index%3 == 0) {
                                da[list] = res[list];
                                da["batch"] = resInd.batch;
                                da['ind0'] = 1;
                                da['ind1'] = "";
                                da['ind2'] = "";
                                da[list + 1] = "";
                                da[list + 2] = "";
                            }

                            if (index%3 == 1) {
                                da[list + 1] = res[list];
                                da['ind1'] = 2;
                                da[list + 2] = "";
                                da['ind2'] = "";
                                da["batch1"] = resInd.batch;
                            }

                            if (index%3 == 2) {
                                da[list + 2] = res[list];
                                da['ind2'] = 3;
                            }
                        }
                    }
                });
            }
        });
        return da;
    }

    return {
        multipleCol,
        dealWithWater
    }
};
