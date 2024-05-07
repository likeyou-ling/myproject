import { useState, useEffect } from 'react';
import { getChannelsAPI } from '@/apis/article';

// 封装获取频道函数组件，后续通过该组件获取频道数据
export default function useChannel() {
    // channel type
    const [channelList, setChannelList] = useState([]);
    useEffect(() => {
        // send request get channelList
        const _getChannelList = async () => {
            const channelListRes = await getChannelsAPI();
            setChannelList(channelListRes.data.channels);
        }

        _getChannelList();
    }, []);
    return {
        channelList
    }
}
