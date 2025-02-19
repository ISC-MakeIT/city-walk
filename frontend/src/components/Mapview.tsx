import React, { useState, useEffect, useCallback } from 'react';
import { JapanMap } from './JapanMap';
import { Prefectures, Checkpoint } from '../data/Prefectures';
import axios from 'axios';

interface Player {
  currentCheckpoint: number;
  points: number;
}

export const MapView: React.FC = () => {
  const [player, setPlayer] = useState<Player>({
    currentCheckpoint: 1, // 北海道からスタート
    points: 0,
  });

  const userId = 1; // 仮のユーザーID

  // movePlayer を useCallback でメモ化
  const movePlayer = useCallback((steps: number) => {
    setPlayer((prev) => {
      const newPrefectureId = prev.currentCheckpoint + steps;
      const nextPrefecture = newPrefectureId > Prefectures.length ? Prefectures.length : newPrefectureId;

      return { ...prev, currentCheckpoint: nextPrefecture };
    });
  }, []);

  // ユーザーのポイントを取得し、地図の進行を更新
  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/todos/user-points/${userId}`);
        setPlayer((prev) => {
          const updatedPoints = response.data.points;
          const steps = Math.floor(updatedPoints / 10); // 10ポイントごとに1マス進む
          movePlayer(steps); // useCallbackでメモ化されたmovePlayerを呼び出す
          return { ...prev, points: updatedPoints };
        });
      } catch (error) {
        console.error("ユーザーのポイント取得エラー:", error);
      }
    };

    fetchUserPoints(); // 非同期関数の呼び出し
  }, [userId, movePlayer]); // movePlayerを依存関係に追加

  return (
      <div>
        <h1>日本地図ゲーム</h1>
        <p>
          現在地: {Prefectures.find((p: Checkpoint) => p.id === player.currentCheckpoint)?.name}
        </p>
        <p>現在のポイント: {player.points}</p>
        <JapanMap
            currentPrefectureId={player.currentCheckpoint}
            onClickPrefecture={() => {
              // onClick時に特別な処理がない場合、ここで何もせず、削除する
            }}
        />
      </div>
  );
};

export default MapView;
